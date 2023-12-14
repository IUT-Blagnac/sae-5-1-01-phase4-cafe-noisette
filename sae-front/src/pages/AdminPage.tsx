import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons, GridToolbar, useGridApiContext, GridValidRowModel,
} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {User} from "../models/User";
import {adminDeleteUser, adminUpdateUser, getUsers} from "../rest/queries";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {useConfirm} from "material-ui-confirm";
import toast from "react-hot-toast";

const roleList = ['ADMIN', 'TEACHER', 'STUDENT_INIT', 'STUDENT_ALT', 'CLIENT', 'GUEST', ''];

function CustomEditComponent(props: { id: any; value: any; field: any; }) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = (event: { target: { value: any; }; }) => {
        const eventValue = event.target.value; // The new value entered by the user
        const newValue =
            typeof eventValue === "string" ? value.split(",") : eventValue;
        apiRef.current.setEditCellValue({
            id,
            field,
            value: newValue.filter((x: string) => x !== "")
        });
    };

    return (
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={value}
            onChange={handleChange}
            sx={{ width: "100%" }}
        >
            {roleList.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
}

const CustomDiscountEditCell = (params: any) => <CustomEditComponent {...params} />;

function CustomFilterInputSingleSelect(props: { [x: string]: any; item: any; applyValue: any; type: any; apiRef: any; focusElementRef: any; }) {
    const { item, applyValue, type, focusElementRef } = props;

    return (
        <TextField
            id={`contains-input-${item.id}`}
            value={item.value}
            onChange={(event) => applyValue({ ...item, value: event.target.value })}
            type={type || "text"}
            variant="standard"
            InputLabelProps={{
                shrink: true
            }}
            inputRef={focusElementRef}
            select
            SelectProps={{
                native: true
            }}
        >
            {["", ...roleList].map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </TextField>
    );
}

export default function AdminPage() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [users, setUsers] = useState<User[] | undefined>();
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const confirm = useConfirm();

    useEffect(() => {
        if (!users) {
            getUsers().then((u) => {
                if (u.data) {
                    const data = u.data?.sort((a, b) => {
                        if (a.id && b.id) { return a.id - b.id }
                        return 0;
                    })
                    setUsers(data)
                    setRows(data.map((user) => ({
                        id: user.id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        roles: user.roles,
                        teamId: user.teamId,
                        // playerInfo: user.playerInfo?.id,
                        isNew: false,
                    })))
                }
            })
        }
    }, [users]);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        confirm({
            title: 'Êtes-vous sûr de vouloir modifier cet utilisateur ?',
            description: 'Toutes les modifications seront sauvegardées',
            confirmationText: 'Oui',
            cancellationText: 'Non',
        }).then(() => {
            const editedRow = rows.find((row) => row.id === id);
            if (editedRow) {
                const user = users?.find((user) => user.id === id);
                if (user) {
                    user.username = editedRow.username;
                    user.firstname = editedRow.firstname;
                    user.lastname = editedRow.lastname;
                    user.email = editedRow.email;
                    user.roles = editedRow.roles;
                    user.teamId = editedRow.teamId;
                }
            }
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        }).catch(() => {});
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        confirm({
            title: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            description: 'Toutes les modifications seront sauvegardées',
            confirmationText: 'Oui',
            cancellationText: 'Non',
        }).then(() => {
            const user = users?.find((user) => user.id === id);
            if (user) {
                adminDeleteUser(user).then((response) => {
                    if (response.responseCode === 200) {
                        toast.success("Utilisateur supprimé");
                        setRows(rows.filter((row) => row.id !== id));
                    }
                }).catch((error) => {
                    toast.error(error.response.data.message);
                });
            }
        }).catch(() => {});
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow: GridValidRowModel = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        const user = users?.find((user) => user.id === updatedRow.id);
        if (user) {
            user.username = updatedRow.username;
            user.firstname = updatedRow.firstname;
            user.lastname = updatedRow.lastname;
            user.email = updatedRow.email;
            user.roles = updatedRow.roles;
            user.teamId = updatedRow.teamId;
            user.playerInfo = undefined;
        }
        if (user) {
            adminUpdateUser(user).then((response) => {
                if (response.responseCode === 200) {
                    toast.success("Utilisateur mis à jour");
                }
            }).catch((error) => {
                toast.error(error.response.data.message);
            });
        }
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 80, editable: false },
        { field: 'username', headerName: 'Username', width: 150, editable: true },
        { field: 'firstname', headerName: 'First name', width: 150, editable: true },
        { field: 'lastname', headerName: 'Last name', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        {
            field: 'roles',
            headerName: 'Roles',
            width: 250,
            type: 'singleSelect',
            valueOptions: roleList,
            editable: true,
            valueFormatter: ({ value }) => (value ? value.join(", ") : ""),
            renderEditCell: CustomDiscountEditCell,
            filterOperators: [
                {
                    value: "contains",
                    getApplyFilterFn: (filterItem) => {
                        if (filterItem.value == null || filterItem.value === "") {
                            return null;
                        }
                        return ({ value }) => {
                            // if one of the cell values corresponds to the filter item
                            return value.some((cellValue: any) => cellValue === filterItem.value);
                        };
                    },
                    InputComponent: CustomFilterInputSingleSelect
                }
            ]
        },
        // { field: "playerInfo", headerName: "Player Info", width: 80, editable: false },
        { field: 'teamId', headerName: 'Team ID', width: 80, editable: false },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 700,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                sx={{
                    mr: 5,
                    ml: 5,
                    mt: 15,
                    border: (theme) => `2px solid ${theme.palette.divider}`,
                    boxShadow: 3,
                }}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: GridToolbar }}
            />
        </Box>
    );
}
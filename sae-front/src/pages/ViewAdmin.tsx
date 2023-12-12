import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { UserRole } from '../models/User';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


const initialRows: GridRowsProp = [
    {
      id: 20,
      name: "test",
      age: 25,
      joinDate: 15/2/2322,
      role: "Admin",
    },
    {
        id: 20,
        name: "test",
        age: 25,
        joinDate: 15/2/2322,
        role: "Admin",
    },
    {
        id: 20,
        name: "test",
        age: 25,
        joinDate: 15/2/2322,
        role: "Admin",
    },
    {
        id: 20,
        name: "test",
        age: 25,
        joinDate: 15/2/2322,
        role: "Admin",
    },
    {
        id: 20,
        name: "test",
        age: 25,
        joinDate: 15/2/2322,
        role: "Admin",
    },
  ];

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
  
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = 20;
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add User
        </Button>
      </GridToolbarContainer>
    );
  }
  
function ViewAdmin() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    // const handleDeleteClick = (id: GridRowId) => () => {
    //   setRows(rows.filter((row) => row.id !== id));
    // };
  
    // const handleCancelClick = (id: GridRowId) => () => {
    //   setRowModesModel({
    //     ...rowModesModel,
    //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
    //   });
  
    //   const editedRow = rows.find((row) => row.id === id);
    //   if (editedRow!.isNew) {
    //     setRows(rows.filter((row) => row.id !== id));
    //   }
    // };
  
    // const processRowUpdate = (newRow: GridRowModel) => {
    //   const updatedRow = { ...newRow, isNew: false };
    //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //   return updatedRow;
    // };
  
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Id', width: 80, editable: true },
      { field: 'username', headerName: 'Username', width: 180, editable: true },
      { field: 'firstname', headerName: 'First name', width: 180, editable: true },
      { field: 'lastname', headerName: 'Last name', width: 180, editable: true },
      {
        field: 'email',
        headerName: 'Email',
        width: 80,
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'password',
        headerName: 'Password',
        width: 180,
        editable: true,
      },
      {
        field: 'roles',
        headerName: 'Roles',
        width: 220,
        editable: true,
        type: 'singleSelect',
        valueOptions: [],
      },
      {
        field: 'teamId',
        headerName: 'Team Id',
        width: 80,
        editable: true,
      },
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
                // onClick={handleCancelClick(id)}
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
            //   onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  
    return (
      <Box
        sx={{
          height: 500,
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
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
        //   processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    );
  }

  export default ViewAdmin;
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import FeedIcon from '@mui/icons-material/Feed';
import {Project} from "../models/Project";

export type DraggableListItemProps = {
    item: Project;
    index: number;
};

const DraggableProjectPreferenceListItem = ({ item, index }: DraggableListItemProps) => {
    return (
        <Draggable draggableId={item.id + item.name} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={snapshot.isDragging ? {
                        draggingListItem: {
                            background: 'rgb(235,235,235)'
                        },
                    }: {}}
                >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main'}}>
                            <FeedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={item.description} />
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableProjectPreferenceListItem;

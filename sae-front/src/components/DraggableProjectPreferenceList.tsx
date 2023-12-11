import * as React from 'react';
import DraggableProjectPreferenceListItem from './DraggableProjectPreferenceListItem';
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';
import {Project} from "../models/Project";

export type DraggableListProps = {
    items: Project[];
    onDragEnd: OnDragEndResponder;
};

const DraggableProjectPreferenceList = React.memo(({ items, onDragEnd }: DraggableListProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <DraggableProjectPreferenceListItem item={item} index={index} key={item.id} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default DraggableProjectPreferenceList;

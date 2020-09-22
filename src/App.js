import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {onDragEnd} from './util/onDragEnd'

const itemsFromBackend = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const columnsFromBackend = {
  1: {
    name: "Backlog",
    items: itemsFromBackend,
  },
  2: {
    name: "Development",
    items: [{ id: "6", content: "phantom task" }],
  },
  3: { name: "In Progress", items: [] },
  4: {
    name: "Done",
    items: [],
  },
};


function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className=" flex flex-wrap  h-screen">
      <h1 className=" text-gray-700  p-3" >Kanban<br/> Board</h1>
      <DragDropContext  onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  snapshot.isDraggingOver ? "bg-yellow-200" : " bg-gray-100"
                } shadow-lg rounded-lg h-auto w-64 m-12`}
              >
                <h1 className=" text-gray-600">{column.name}</h1>
                {column.items.map((item, index) => (
                  
                  <Draggable 
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                       key={item.id} 
                       column={item} 
                       ref={provided.innerRef}
                       className=' bg-blue-200 h-20 my-2 rounded-md shadow w-auto p-4 hover:bg-green-200'
                        >
                       <p className=" text-justify ">{item.content}</p>
                       </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Columns from "./components/Columns";

const itemsFromBackend = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const columnsFromBackend = {
  1: {
    name: "Requested",
    items: itemsFromBackend,
  },
  2: {
    name: "To do",
    items: [{ id: "6", content: "phantom task" }],
  },
  3: { name: "In Progress", items: [] },
  4: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className=" flex  h-screen">
      <DragDropContext  onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  snapshot.isDraggingOver ? "bg-yellow-200" : " bg-indigo-100"
                } shadow-lg rounded-lg h-auto w-64 m-12`}
              >
                <h1 className="text-center">{column.name}</h1>
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
                       className=' bg-teal-100 h-20 my-2 round shadow w-auto p-4'
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

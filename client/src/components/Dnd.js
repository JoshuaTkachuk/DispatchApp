import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/Dnd.css";
import "../styles/TopBox.css";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Truck1",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "truck1" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Truck2",
    items: [
      { id: "27fd50b3-3841-496e-8b32-73636f6f4197", name: "truck2" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Truck3",
    items: [
      { id: "28fd50b3-3841-496e-8b32-73636f6f4197", name: "truck3" },
    ],
    tint: 3,
  },
];

const CARD = [
  {
    id:"11",
    name: "Monday",
  },

  {
    id:"12",
    name: "Tuesday",
  },

  {
    id:"13",
    name: "Wednesday",
  },

  {
    id:"14",
    name: "Thursday",
  },

  {
    id:"15",
    name: "Friday",
  },

]

function App() {
    const date = new Date();
    const [stores, setStores] = useState(DATA);
    const [days,setDays] = useState(CARD);

    const handleDragDrop = (results) => {
        const {source, destination, type} = results;

            if (!destination) return;
            if (
                source.droppableId === destination.droppableId && 
                source.index === destination.index
            ) 
            
            return;

            if (type === 'group'){
                const reorderedStores = [...stores];
                const sourceIndex = source.index;
                const destinationIndex = destination.index

                const [removedStore] = reorderedStores.splice(sourceIndex, 1)
                reorderedStores.splice(destinationIndex, 0, removedStore)

                return setStores(reorderedStores);
            }

      
            
    };

  

    return (
   <div>
      <DragDropContext onDragEnd={handleDragDrop}>
      <div className="topbox">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    index={index}
                    key={store.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                       <h3>{store.name}</h3>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </div>

      <div className="box-container">
  
  {days.map((day) => {
    return (
      <Droppable droppableId={day.id} type="group">
        {(provided) => ( 
          <div {...provided.droppableProps} ref={provided.innerRef}>
        <div className="card">
          <div className="header">
           <h1>{day.name}</h1>
         </div>
        </div>
        {provided.placeholder}
        </div>
        )}
      </Droppable>

     
    );
    
     
  })}
  
</div>

      </DragDropContext>

    </div>
    
  );
}



export default App;


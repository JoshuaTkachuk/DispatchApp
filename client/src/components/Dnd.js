import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/Dnd.css";


const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Truck1",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "name" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "name2" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Truck2",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "name",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "name2" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Truck3",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "name" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "name2" },
    ],
    tint: 3,
  },
];

function App() {

    const [stores, setStores] = useState(DATA);

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

            const storeSourceIndex = stores.findIndex((store) => store.id === source.droppableId)
            const storeDestinationIndex = stores.findIndex((store) => store.id === destination.droppableId)

            const newSourceItems = [...stores[storeSourceIndex].items]
            const newDestinationItems = source.droppableId !==destination.droppableProps 
            ? [...stores[storeDestinationIndex].items ] 
            : newSourceItems;

            const [deletedItem] = newSourceItems.splice(source.index, 1)
            newDestinationItems.splice(destination.index, 0, deletedItem)

            const newStores =[...stores]

            newStores[storeSourceIndex] = {
                ...stores[storeSourceIndex],
                items:newSourceItems
            }

            newStores[storeDestinationIndex] = {
                ...stores[storeDestinationIndex],
                items:newDestinationItems
            }

            setStores(newStores);
            

    };

    return (
    <div className="box-container">
    <div className="layout__wrapper">
        <div className="card"> 
            <DragDropContext 
                onDragEnd={handleDragDrop}
            >
            <div className="header">
                <h1>Monday</h1>
            </div>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stores.map((store, index) => (
                    <Draggable draggableId={store.id} key={store.id} index={index}>
                        {(provided) => (
                           
                        <div
                        {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                           <h3>{store.name}</h3>
                        </div>
                           
                        )}
                       
                    </Draggable>
                ))}
                {provided.placeholder}
                    </div>
                    
                )}
            </Droppable>
            </DragDropContext>
       </div>
    </div>

   

    <div className="layout__wrapper">

        <div className="card">
            <h1>
                Tuesday
            </h1>
        </div>

    </div>

    </div>

    );
}



export default App;


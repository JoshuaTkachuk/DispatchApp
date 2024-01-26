import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/Dnd.css";
import "../styles/TopBox.css";


// const DATA = [
//   {
//     id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
//     name: "Truck1",
//     items: [
//       { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "truck1" },
//     ],
//     tint: 1,
//   },
//   {
//     id: "487f68b4-1746-438c-920e-d67b7df46247",
//     name: "Truck2",
//     items: [
//       { id: "27fd50b3-3841-496e-8b32-73636f6f4197", name: "truck2" },
//     ],
//     tint: 2,
//   },
//   {
//     id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
//     name: "Truck3",
//     items: [
//       { id: "28fd50b3-3841-496e-8b32-73636f6f4197", name: "truck3" },
//     ],
//     tint: 3,
//   },
// ];

const CARD = [
  {
    id:"11",
    name: "Monday",
    trucks:[]
  },

  {
    id:"12",
    name: "Tuesday",
    trucks:[]
  },

  {
    id:"13",
    name: "Wednesday",
    trucks:[]
  },

  {
    id:"14",
    name: "Thursday",
    trucks:[]
  },

  {
    id:"15",
    name: "Friday",
    trucks:[]
  },

]

function App(props) {

    const date = new Date();
    const [trucks, setTrucks] = useState([]);
    const [days,setDays] = useState(CARD);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/allTrucks")
    .then((result)=>{
        console.log(result.data)
        console.log(result.data.filter(truck => truck.onBoard == true))
        setTrucks(result.data.filter(truck => truck.onBoard == true))
    })
    .catch(err=>{
        console.log(err)
    })
},[])

const removeFromBoard =(id)=>{
  axios.put("http://localhost:8000/api/removeFromBoard",{id})
  .then((result)=>{
      console.log(result.data)
      setTrucks(trucks.filter(truck => truck._id != id))
  })
  .catch(err=>{
      console.log(err)
  })
}

    console.log(props.trucks);

    const handleDragDrop = (results) => {
      console.log(results)
        const {source, destination, type} = results;

            if (!destination) return;
            if (
                source.droppableId === destination.droppableId && 
                source.index === destination.index
            ) 
            
            return;

            if (type === 'group'){
                const reorderedTrucks = [...trucks];
                const sourceIndex = source.index;
                const destinationIndex = destination.index

                const [removedTruck] = reorderedTrucks.splice(sourceIndex, 1)
                reorderedTrucks.splice(destinationIndex, 0, removedTruck)

                return setTrucks(reorderedTrucks);
            }
            if(source.droppableId === "ROOT"){

            const truckSourceIndex = source.index;
            const truckDestinationIndex = destination.index;
            console.log(truckSourceIndex)
            console.log(truckDestinationIndex)
            
            const daySourceIndex = days.findIndex(
              (day) => day.id === source.droppableId
            );
            const dayDestinationIndex = days.findIndex(
              (day) => day.id === destination.droppableId
            );
        
            const newSourceTrucks = [...days[daySourceIndex].trucks];
            const newDestinationTrucks =
              source.droppableId !== destination.droppableId
                ? [...days[dayDestinationIndex].trucks]
                : newSourceTrucks;
        
            const [deletedTruck] = newSourceTrucks.splice(truckSourceIndex, 1);
            newDestinationTrucks.splice(truckDestinationIndex, 0, deletedTruck);
        
            const newDays = [...days];
        
            newDays[daySourceIndex] = {
              ...days[daySourceIndex],
              trucks: newSourceTrucks,
            };
            newDays[dayDestinationIndex] = {
              ...days[dayDestinationIndex],
              trucks: newDestinationTrucks,
            };
        
            setDays(newDays);
          }
            

      
            
    };

  

    return (
   <div>
      <DragDropContext onDragEnd={handleDragDrop}>
      <div className="topbox">
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {trucks.map((truck, index) => (
                  <Draggable
                    draggableId={truck._id}
                    index={index}
                    key={truck._id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div>
                          <h3>{truck.driverName}</h3>
                          <button onClick={(e)=> removeFromBoard(truck._id)}>remove From board</button>
                        </div>
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
  
  {days.map((day, indx) => {
    return (
      <Droppable droppableId={indx} type="group">
        {(provided) => ( 
          <div {...provided.droppableProps} ref={provided.innerRef}>
        <div className="card">
          <div className="header">
           <h1>{day.name}</h1>
            <TruckList {...day} />
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
function TruckList({ name, trucks, id }) {
  return (
    <Droppable droppableId={id} type="group">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="truck-container">
          </div>
          <div className="truucks-container">
            {
            trucks.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="truck-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))
          }
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}




export default App;


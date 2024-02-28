import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/Dnd.css";
import "../styles/TopBox.css";


function App(props) {
    const d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [trucks, setTrucks] = useState([]);
    const [days,setDays] = useState([
      {
        date: new Date(d.setDate(d.getDate())),
        id:"11",
        name: weekday[d.getDay()],
        trucks:[]
      },
    
      {
        date: new Date(d.setDate(d.getDate() + 1)),
        id:"12",
        name: weekday[d.getDay()],
        trucks: []
      },
    
      {
        date: new Date(d.setDate(d.getDate() + 1)),
        id:"13",
        name: weekday[d.getDay()],
        trucks:[]
      },
    
      {
        date: new Date(d.setDate(d.getDate() + 1)),
        id:"14",
        name: weekday[d.getDay()],
        trucks:[]
      },
    
      {
        date: new Date(d.setDate(d.getDate() + 1)),
        id:"15",
        name: weekday[d.getDay()],
        trucks:[]
      },
    
    ]);

  useEffect(()=>{
    console.log(days, "logging days when useEffect runs")
    axios.get("http://localhost:8000/api/allTrucks")
    .then((result)=>{
        console.log(result.data)
        setTrucks(result.data.filter(truck => truck.onBoard === true && truck.dateReady === null));
        const weekTrucks = result.data.filter(truck => truck.onBoard === true && truck.dateReady !== null);
        console.log(weekTrucks, "week trucks");
        weekTrucks.forEach((truck, idx)=>{
          let tempTruckDate = new Date(truck.dateReady)
          let tempDayDate = new Date(days[0].date)

          if(tempTruckDate < tempDayDate){
            truck.dateReady = tempDayDate;
          }

        })

        setDays(prevDays => {
          const newDays = [...prevDays];
  
          newDays.forEach((day, idx) => {
            const dayTrucks = [];
  
            weekTrucks.forEach((truck) => {
              const truckDate = new Date(truck.dateReady);
  
              if (truckDate.getDate() === day.date.getDate() && truckDate.getDay() === day.date.getDay() && truckDate.getFullYear() === day.date.getFullYear()) {
                console.log("match found");
  
                if (newDays[idx].trucks.includes(truck)) {
                  console.log("day already includes this truck");
                  return;
                } else {
                  dayTrucks.push(truck);
                }
              }
            });

            dayTrucks.sort((a, b) => a.dayIndex - b.dayIndex);

            newDays[idx] = {
              ...newDays[idx],
              trucks: dayTrucks,
            };
          });

          return newDays;
        });
    })
    .catch(err=>{
        console.log(err)
    })
},[])

const removeFromBoard = (truckId, dayId, indx)=>{
    axios.put("http://localhost:8000/api/removeFromBoard",{truckId})
  .then((result)=>{
      console.log(result.data)
      setTrucks(trucks.filter(truck => truck._id !== truckId))
  })
  .catch(err=>{
      console.log(err)
  })

  if( dayId && indx !== null){

    const dayIndex = days.findIndex(
      (day) => day.id === dayId
    );
    
    console.log(dayIndex, "day index");
    console.log(indx, "indx");
    
    console.log(days, "days before truck deleted")
    days[dayIndex].trucks.splice(indx,1)
    console.log(days, "days after truck deleted")
  }


}

    console.log(props.trucks);

    const handleDragDrop = (results) => {
        const {source, destination, type} = results;
        console.log(source.droppableId, "source droppable id")
        console.log(destination.droppableId, "destination droppable id")

            if (!destination) return;
            if (source.droppableId === destination.droppableId && source.index === destination.index){
              return;
            }

            if (source.droppableId === "ROOT" && destination.droppableId === "ROOT"){
                console.log("reordering trucks within ROOT ID")
                const reorderedTrucks = [...trucks];
                const sourceIndex = source.index;
                const destinationIndex = destination.index

                const [removedTruck] = reorderedTrucks.splice(sourceIndex, 1)
                reorderedTrucks.splice(destinationIndex, 0, removedTruck)

                return setTrucks(reorderedTrucks);
            }
          
            //IF ELSE STATEMENTS THROUGHOUT THE LOGIC INSTEAD OF TWO MASSIVE IF STATEMENT BLOCKS OF CODE
            
            const truckSourceIndex = source.index;
            const truckDestinationIndex = destination.index;
            let newSourceTrucks = [];
            let newDestinationTrucks = [];

            const daySourceIndex = days.findIndex(
              (day) => day.id === source.droppableId
            );

            const dayDestinationIndex = days.findIndex(
              (day) => day.id === destination.droppableId
            );
            if((source.droppableId !== "ROOT" && destination.droppableId !== "ROOT") || (source.droppableId !== "ROOT" && destination.droppableId === "ROOT")){
              console.log("1")
              newSourceTrucks = [...days[daySourceIndex].trucks];
            }
            if(source.droppableId === "ROOT" && destination.droppableId !== "ROOT"){
              console.log("2")
              newSourceTrucks = trucks;
            }
            
            if(destination.droppableId === "ROOT" && source.droppableId !== "ROOT"){
              console.log("3")
              newDestinationTrucks = trucks;
            }
            if(destination.droppableId !== "ROOT"){
              console.log("4")
              newDestinationTrucks =
              source.droppableId !== destination.droppableId
                ? [...days[dayDestinationIndex].trucks]
                : newSourceTrucks;
            }

            const [deletedTruck] = newSourceTrucks.splice(truckSourceIndex, 1);
            console.log(deletedTruck, "deleted truck not moving to a null position")
            console.log(days[dayDestinationIndex], "this will be the day to set the date to")
            if(destination.droppableId === "ROOT"){
              console.log("deleting date")
              deletedTruck.date = null;
              console.log(deletedTruck);
            }
            console.log(deletedTruck, "deleted truck moving to a null poistion")
            newDestinationTrucks.splice(truckDestinationIndex, 0, deletedTruck);

            const newDays = [...days];

            if(destination.droppableId !== "ROOT"){
              console.log("5")
              newDays[dayDestinationIndex] = {
                ...days[dayDestinationIndex],
                trucks: newDestinationTrucks,
              };
            }

            if(source.droppableId !== "ROOT" && destination.droppableId !== "ROOT" || source.droppableId !== "ROOT" && destination.droppableId === "ROOT" ){
              console.log("6")
              newDays[daySourceIndex] = {
                ...days[daySourceIndex],
                trucks: newSourceTrucks,
              };
            }
            setDays(newDays);
            
            
            
            // updating truck index per day in backend
            if(source.droppableId !== "ROOT"){
              newDays[daySourceIndex].trucks.forEach((truck, idx1)=>{
              console.log(truck, idx1, "day source index trucks backend")
              axios.put("http://localhost:8000/api/updateTruckIndex",{truckId: truck._id, dayIndex: idx1})
              .then((result)=>{
                console.log(result,"updated truck dayIndex")
              })
              .catch(err=>{
                console.log(err)
              })
            })
            }
            if(destination.droppableId !== "ROOT" || newDays[daySourceIndex] === newDays[dayDestinationIndex]){
              newDays[dayDestinationIndex].trucks.forEach((truck,idx2)=>{
                console.log(truck, idx2, "day destination index trucks backend")
                axios.put("http://localhost:8000/api/updateTruckIndex",{truckId: truck._id, dayIndex: idx2})
                .then((result)=>{
                  console.log(result,"updated truck dayIndex")
                })
                .catch(err=>{
                  console.log(err)
                })
              })

            }


            // updating date in the backend
            let dateReady = null;
            if(destination.droppableId !== "ROOT"){
              dateReady = days[dayDestinationIndex].date
            }
            axios.put("http://localhost:8000/api/updateDate",{truckId: deletedTruck._id, dateReady: dateReady})
            .then((result)=>{
              console.log(result)
              console.log(dateReady, "dateReady in backend")
            })
            .catch(err =>{
              console.log(err)
            })
            

      
            
    };
    const handleTime=(truckId, timeReady)=>{
      axios.put("http://localhost:8000/api/updateTime", {truckId, timeReady})
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
    }

  

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
                          <form onSubmit={handleTime}>
                            <input type="text" placeholder={truck.timeReady} onChange={(e)=> handleTime(truck._id, e.target.value)}></input>
                          </form>
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
      <Droppable droppableId={day.id} type="group" key={day.id}>
        {(provided) => ( 
          <div {...provided.droppableProps} ref={provided.innerRef}>
        <div className="card">
          <div className="header">
           <h1>{day.name}</h1>
           <h2> {day.date.getMonth() + 1}/{day.date.getDate()}/{day.date.getFullYear()}</h2>
            <Droppable droppableId={`${day.id}`} type="group" key={day.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="truck-container">
                  </div>
                  <div className="truucks-container">
                    {
                      day.trucks.map((item, index) => (
                        <Draggable draggableId={item._id} index={index} key={item._id}>
                          {(provided) => (
                          <div
                          className="truck-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          >
                          <h4>{item.driverName}</h4>
                          <form onSubmit={handleTime}>
                            <input type="text" placeholder={item.timeReady} onChange={(e)=> handleTime(item._id, e.target.value)}></input>
                          </form>
                          <button onClick={(e)=> removeFromBoard(item._id, day.id, index)}>remove From board</button>
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

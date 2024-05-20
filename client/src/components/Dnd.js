import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/Dnd.css";
import "../styles/TopBox.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";




function App(props) {
    const d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [trucks, setTrucks] = useState([]);
    const [timeId, setTimeId] = useState('10:00')
    const [truckVisible, setTruckVisible] = useState("none")
    const [upVisible, setUpVisible] = useState("none")
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
    axios.get("http://localhost:8000/api/User", {withCredentials: true})
    .then((result1)=>{
      const email = result1.data.email
      console.log(email)
      axios.get(`http://localhost:8000/api/TrucksByUserID/${email}`,{withCredentials: true})
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

    })
    .catch(err=>{
      console.log(err)
    })
},[])
const removeFromBoard = (truckId, dayId, indx, dateReady)=>{
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
  axios.put("http://localhost:8000/api/updateDate",{truckId: truckId, dateReady: dateReady})
    .then((result)=>{
      console.log(result)
      console.log(dateReady, "dateReady in backend")
    })
    .catch(err =>{
      console.log(err)
    })


}

    console.log(props.trucks);

    const handleDragDrop = (results) => {
        const {source, destination, type} = results;

            if (!destination) return;
            if (source.droppableId === destination.droppableId && source.index === destination.index){
              return;
            }

            if (source.droppableId === "ROOT" && destination.droppableId === "ROOT"){
                // REORDERING TRUCKS INDEX WITHIN ROOT ID
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

            //SETTING VARIBLE FOR SOURCE INDEX OF THE DAY THE TRUCK IS MOVING FROM
            const daySourceIndex = days.findIndex(
              (day) => day.id === source.droppableId
            );
            // SETTING VARIABLE FOR DESTINATION INDEX OF THE DAY THE TRUCK IS MOVING TO
            const dayDestinationIndex = days.findIndex(
              (day) => day.id === destination.droppableId
            );

            // SET SOURCE TRUCKS VARIABLE BASED OFF IF THE TRUCKS SOURCE LOCATION WASN'T THE ROOT ID
            if((source.droppableId !== "ROOT" && destination.droppableId !== "ROOT") || (source.droppableId !== "ROOT" && destination.droppableId === "ROOT")){
              console.log("1")
              newSourceTrucks = [...days[daySourceIndex].trucks];
            }
            
            // SET SOURCE TRUCKS VARIABLE BASED OFF IF THE TRUCK IS MOVING FROM SOURCE ID "ROOT"
            if(source.droppableId === "ROOT" && destination.droppableId !== "ROOT"){
              console.log("2")
              newSourceTrucks = trucks;
            }
            
            // SET DESTINATION TRUCKS VARIABLE BASED OFF IF THE DESTINATION IS THE "ROOT" ID
            if(destination.droppableId === "ROOT" && source.droppableId !== "ROOT"){
              console.log("3")
              newDestinationTrucks = trucks;
            }

            // SET DESTINATION TRUCKS BASED OFF IF THE TRUCKS DESTINATION IS NOT THE "ROOT" ID
            if(destination.droppableId !== "ROOT"){
              console.log("4")
              newDestinationTrucks =
              source.droppableId !== destination.droppableId
                ? [...days[dayDestinationIndex].trucks]
                : newSourceTrucks;
            }

            // SET THE DELETED TRUCK BASED OFF TRUCK SOURCE INDEX DEFINED ABOVE
            const [deletedTruck] = newSourceTrucks.splice(truckSourceIndex, 1);
            console.log(deletedTruck, "deleted truck not moving to a null position")
            console.log(days[dayDestinationIndex], "this will be the day to set the date to")

            // IF THE TRUCK IS MOVING TO "ROOT" ID, SET THE DATE TO NULL
            if(destination.droppableId === "ROOT"){
              console.log("deleting date")
              deletedTruck.date = null;
              console.log(deletedTruck);
            }
            console.log(deletedTruck, "deleted truck moving to a null poistion")
            newDestinationTrucks.splice(truckDestinationIndex, 0, deletedTruck);

            // DEFINING VARIABLE FOR THE "NEW DAYS" THAT WILL BE MANIPULATED
            const newDays = [...days];

            // IF THE TRUCK IS NOT MOVING TO THE "ROOT" ID, SET THE NEW DAYS DESTINATION TRUCKS ACCORDINGLY
            if(destination.droppableId !== "ROOT"){
              console.log("5")
              newDays[dayDestinationIndex] = {
                ...days[dayDestinationIndex],
                trucks: newDestinationTrucks,
              };
            }

            // IF THE TRUCK IS NOT MOVING FROM THE "ROOT" ID, SET THE DAYS WITH THEIR NEW TRUCKS ACCORDINGLY
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
    const handleTime=(e, truckId, index)=>{
      e.preventDefault();

      setDays(prevDays =>{
        const newDays = [...prevDays]

          newDays[index].trucks.forEach((truck, indx)=>{
            if(truck._id === truckId){
              truck.timeReady = document.getElementById(`${truckId}timeInput`).value
            }
          })


        return newDays
      })

      console.log(e, "save event")
      const timeReady = document.getElementById(`${truckId}timeInput`).value
      console.log(timeReady, "time ready element")
      axios.put("http://localhost:8000/api/updateTime", {truckId, timeReady})
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
    }

    const changeVisible=(e, index)=>{
      e.preventDefault();
      if(document.getElementById(index).style.display === "none"){
        document.getElementById(index).style.display = "block"
      }
      else{
        document.getElementById(index).style.display = "none"
      }
    }

    const handleClick = (id) => {
      // Toggle visibility of arrows
      if(document.getElementById(`${id}downArrow`).style.display === "block"){
        document.getElementById(`${id}downArrow`).style.display = "none"
        document.getElementById(`${id}upArrow`).style.display = "block"
      }
      else{
        document.getElementById(`${id}downArrow`).style.display = "block"
        document.getElementById(`${id}upArrow`).style.display = "none"
      }
  };
    

    const handleLocation=(e, truckId, emptyLocation, dayIndex)=>{
      e.preventDefault();

      setDays(prevDays =>{
        const newDays = [...prevDays]

          newDays[dayIndex].trucks.forEach((truck, indx)=>{
            if(truck._id === truckId){
              truck.emptyLocation = emptyLocation
            }
          })


        return newDays
      })
      
      axios.put("http://localhost:8000/api/updateEmptyLocation",{truckId, emptyLocation})
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })

    }
    const handlestatus=(itemId)=>{
      if(document.getElementById(`${itemId}status`).value === "TIME"){
        document.getElementById(`${itemId}timeInput`).style.display = "block"
        document.getElementById(`${itemId}timeInput`).focus()
        
      }
      else{
        document.getElementById(`${itemId}timeInput`).style.display = "none"
      }
    }
    const handleNotes = (itemId) =>{
      
    }

    function checkSubmit(e, timeId, statusId) {
      if(e && e.keyCode == 13) {
        document.getElementById(statusId).style.display = "none"
        document.getElementById(timeId).blur();
     }
   }
   const handleStatusBlur = (statusId, timeId) =>{
    if(document.getElementById(statusId).value === "TIME"){
      document.getElementById(statusId).style.display = "none"
    }

   }
   const handleBlur = (statusId)=>{
    document.getElementById(statusId).focus()
   }

    

    return (
   <div className="body">
      <DragDropContext onDragEnd={handleDragDrop}>
       <div className="topbox">
        <div className="top-header">
          <h1> TBD </h1>
        </div>
        <div className="items-container"> 
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
                      <div className="top-item-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className="top-item-header">
                        <button onClick={(e)=> removeFromBoard(truck._id)} className="top-item-button"><HiOutlineXMark style={{ fontSize:'1.3vh'}}/></button>
                        <p className="top-popup">Remove From Board</p>
                        </div>
                        <div className="top-truck-data"> 
                          <h3>{truck.driverName}</h3>
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
      </div> 

      <div className="box-container">
  {days.map((day, indx) => {
    return (    
        <div className="card">
          <div className="header">
           <h1>{day.name}</h1>
           <p> {day.date.getMonth() + 1}/{day.date.getDate()}/{day.date.getFullYear()}</p>
           </div>
            <Droppable droppableId={day.id} type="group" key={day.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="items-container">
                    {
                      day.trucks.map((item, index) => (
                        <Draggable draggableId={item._id} index={index} key={item._id}>
                          {(provided) => (
                          <div className="item-container"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          >
                          
                          <div className="truck-header">

                          <div className="truckHeader-row1">
                          <input placeholder="location" id = {`${item._id}Location`} value={item.emptyLocation} onChange={(e) => handleLocation(e,item._id, e.target.value, indx)} type="text"/>
                          <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <button onClick={(e)=> removeFromBoard(item._id, day.id, index)} className="button-delete"> <HiOutlineXMark style={{ fontSize:'1.3vh'}}/> </button>
                            <p className="popup" >Remove From Board</p>
                          </div>
                          </div>
                          <div className="truckHeader-row2"> 
                          <form >
                            <select onBlur={(e)=>handleStatusBlur(`${item._id}status`,`${item._id}timeInput` )} name="status" id={`${item._id}status`} onChange={(e)=>handlestatus(item._id)}>
                              <option value="READY">READY</option>
                              <option value="CONFIRM" selected>CONFIRM</option>
                              <option value="TIME">TIME</option>
                            </select>
                            <div style={{display: "flex"}}>
                              <input type="time" id={`${item._id}timeInput`} style={{display: "none", width: "75px"}} value={item.timeReady} onBlur={(e)=>handleBlur(`${item._id}status`)} onFocus={(e)=>document.getElementById(`${item._id}status`).style.display = "block"} onKeyDown={(e)=>checkSubmit(e, `${item._id}timeInput`, `${item._id}status`)} onChange={(e) => handleTime(e,item._id, indx)}></input>
                            </div>
                          </form>
                          <h4 className="trailer-type">{item.trailerType}</h4>
                          <h4 style={{paddingLeft: '.5vw', fontWeight: '100'}}>{item.driverName}</h4>
                          </div>
                          </div>

                          <div >
                            {
                              item.notes ? 
                              <div>
                                <p className="notes"> Notes:</p>
                                <p>{item.notes}</p>
                              </div>
                              :
                              <></>
                            }
                              
                          </div>

                          <div onClick={(e) => handleClick(item._id)}>
                              <div className="drop-down" onClick={(e)=>changeVisible(e,item._id)}>
                                <SlArrowDown id={`${item._id}downArrow`} style={{display : "block", margin: '.2rem', color: 'rgb(217,217,217)'}}/>
                                <SlArrowUp id={`${item._id}upArrow`} style={{display : "none", margin: '.2rem', color: 'rgb(217,217,217)'}}/>

                              </div>

                          </div>


                          <div id={item._id} className="truck-body" style={{display: truckVisible, justifyContent: 'center'}}>
                            <span className="line"></span>
                            <div className="truck-body1">
                              <p style={{marginLeft:'1vw', width: 'auto'}}>{item.trailerNum}</p>
                              <p style={{marginLeft:'1vw', width: 'auto'}}>{item.truckNum}</p>
                              <p style={{marginLeft:'1vw',  width: 'auto'}}>{item.phoneNum}</p>  
                              <p style={{marginLeft:'1vw',  width: 'auto'}}>More Info</p>
                            </div>
                            <input onChange={(e)=> handleNotes(item._id)}>{item.notes}</input>
                          </div>
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

     
    );
    
     
  })}
  
</div>

      </DragDropContext>

    </div>
    
  );
}


export default App;
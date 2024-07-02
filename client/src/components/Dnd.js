import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "../styles/Dnd.module.css";  
import Header from "./Header";
import { HiOutlineXMark } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { MdPhoneEnabled } from "react-icons/md";
import { MdOutlineOpenInNew } from "react-icons/md";




function App(props) {
    const toggleComponents = props.toggleComponents;
    let d = new Date();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [trucks, setTrucks] = useState([]);
    const [timeId, setTimeId] = useState('10:00')
    const [truckVisible, setTruckVisible] = useState("none")
    const [upVisible, setUpVisible] = useState("none")
    const [scheduleVisilble, setScheduleVisible] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
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
            axios.put("http://localhost:8000/api/updateDate", {_id:truck._id, dateReady:truck.dateReady})
            .then((result)=>{
              console.log(result)
            })
            .catch(err=>{
              console.log(err)
            })
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
},[days[0].date])
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


    const handleDragStart = () =>{
      setIsDragging(true)
    }
    
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
            setIsDragging(false)
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
  
    const handleLocation=(e,truckId, emptyLocation, dayIndex)=>{
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
    const handlestatus=(e,itemId, dayIndex)=>{
      e.preventDefault();


      let status = document.getElementById(`${itemId}status`).value

      setDays(prevDays =>{
        const newDays = [...prevDays]

          newDays[dayIndex].trucks.forEach((truck, indx)=>{
            if(truck._id === itemId){
              if(truck.status === "READY" || truck.status === "CONFIRM"){
                truck.timeReady = "";
              }
              truck.status = status
            }
          })


        return newDays
      })
      
      if(document.getElementById(`${itemId}status`).value === "TIME"){
        document.getElementById(`${itemId}timeInput`).style.display = "block"
        document.getElementById(`${itemId}timeInput`).focus()
        document.getElementById(`${itemId}statusColor`).style.borderLeft = "3px solid yellow"
        
      }
      else{
        document.getElementById(`${itemId}timeInput`).style.display = "none"
        if(document.getElementById(`${itemId}status`).value === "CONFIRM"){
          document.getElementById(`${itemId}statusColor`).style.borderLeft = "3px solid green"
        }
        if(document.getElementById(`${itemId}status`).value === "READY"){
          document.getElementById(`${itemId}statusColor`).style.borderLeft = "3px solid red"
        }
      }
      
      axios.put("http://localhost:8000/api/updateStatus", {truckId: itemId, status: status })
      .then((result)=>{
        console.log(result)
      })
      .catch(err =>{
        console.log(err)
      })


    }
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
    const handleNotes = (e, truckId, index, notes) =>{
      e.preventDefault()

      setDays(prevDays =>{
        const newDays = [...prevDays]

          newDays[index].trucks.forEach((truck, indx)=>{
            if(truck._id === truckId){
              truck.notes = document.getElementById(`${truckId}notesInput`).value
            }
          })


        return newDays
      })
      
      axios.put("http://localhost:8000/api/updateNotes", {truckId, notes})
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
      
      
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
   const handleClickTimeInput = (e,itemId) =>{
    e.preventDefault()

    if(document.getElementById(`${itemId}status`).style.display === "none"){
      document.getElementById(`${itemId}status`).style.display = "block"
    }
    else{
      document.getElementById(`${itemId}status`).style.display = "none"
    }
   }
   const loadMoreDays=()=>{
    setDays(prevDays =>{
      const newDays = [...prevDays]

        newDays.forEach((day, indx)=>{
          let tempDate = new Date(day.date)
          day.date = new Date(tempDate.setDate(tempDate.getDate() + 5))
          console.log(day.date)
          let tempNum = Number(day.id) + 5
          day.id = tempNum.toString();
          day.name = weekday[day.date.getDay()]
          
        })


      return newDays
    })
   }
   const loadOneDay=()=>{
    setDays(prevDays =>{
      const newDays = [...prevDays]

        newDays.forEach((day, indx)=>{
          let tempDate = new Date(day.date)
          day.date = new Date(tempDate.setDate(tempDate.getDate() + 1))
          console.log(day.date)
          let tempNum = Number(day.id) + 1
          day.id = tempNum.toString();
          day.name = weekday[day.date.getDay()]
          
        })


      return newDays
    })
   }
   const loadPreviousDays=()=>{
    setDays(prevDays =>{
      const newDays = [...prevDays]

        newDays.forEach((day, indx)=>{
          let tempDate = new Date(day.date)
          day.date = new Date(tempDate.setDate(tempDate.getDate() - 5))
          console.log(day.date)
          let tempNum = Number(day.id) - 5
          day.id = tempNum.toString();
          day.name = weekday[day.date.getDay()]
          
        })


      return newDays
    })
   }
   const loadPreviousDay=()=>{
    setDays(prevDays =>{
      const newDays = [...prevDays]

        newDays.forEach((day, indx)=>{
          let tempDate = new Date(day.date)
          day.date = new Date(tempDate.setDate(tempDate.getDate() - 1))
          console.log(day.date)
          let tempNum = Number(day.id) - 1
          day.id = tempNum.toString();
          day.name = weekday[day.date.getDay()]
          
        })


      return newDays
    })
   }


    

    return (
   <div className="body">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragDrop}>
        <Header trucks={trucks} removeFromBoard={removeFromBoard} toggleComponents={toggleComponents} isDragging={isDragging}/>
      <div className={styles.boxContainer}>
      <buttton onClick={loadPreviousDays} style={{backgroundColor: "white"}}>load previos days</buttton>
      <buttton onClick={loadPreviousDay} style={{backgroundColor: "white"}}>load previos day</buttton>
  {days.map((day, indx) => {
    return (    
        <div className={styles.card}>
          <div className={styles.header}>
           <h1>{day.name}</h1>
           <p> {day.date.getMonth() + 1}/{day.date.getDate()}/{day.date.getFullYear()}</p>
           </div>
            <Droppable droppableId={day.id} type="group" key={day.id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className={styles["items-container"]}>
                    {
                      day.trucks.map((item, index) => (
                        <Draggable draggableId={item._id} index={index} key={item._id}>
                          {(provided) => (
                            
                          <div id={`${item._id}statusColor`} className={styles["item-container"]}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style = {item.status === "READY" ? {...provided.draggableProps.style, borderLeftColor: "red"} : item.status === "TIME" ? {...provided.draggableProps.style, borderLeftColor: "yellow"} : item.status === "CONFIRM" ? {...provided.draggableProps.style, borderLeftColor: "green"} : {}}
                          >
                          
                          <div className={styles["truck-header"]}>

                          <div className={styles["truckHeader-row1"]}>
                          <input  id={`${item._id}Location`} onChange={(e) => handleLocation(e,item._id,e.target.value,indx)} value={item.emptyLocation}/>
                          <div style={{width: 'auto', display: 'flex', justifyContent: 'right'}}>
                            <button onClick={(e)=> removeFromBoard(item._id, day.id, index)} className={styles["button-delete"]}> <HiOutlineXMark style={{ fontSize:'1.3vh'}}/> </button>
                            <p className={styles["popup"]} >Remove From Board</p>
                          </div>
                          </div>

                          <div className={styles["truckHeader-row2"]}> 
                          <form>
                            <select style = {item.status === "TIME" ? {display: "none"} : {display: "block"}} onBlur={(e)=>handleStatusBlur(`${item._id}status`,`${item._id}timeInput` )} name="status" id={`${item._id}status`} onChange={(e)=>handlestatus(e,item._id,indx)}>
                              {
                                item.status === "READY" ?
                                <option value="READY" selected>READY</option> :
                                <option value="READY">READY</option>
                              }
                              {
                                item.status === "CONFIRM" ?
                                <option value="CONFIRM" selected>CONFIRM</option> :
                                <option value="CONFIRM">CONFIRM</option>
                              }
                              {
                                item.status !== "READY" && item.status !== "CONFIRM" ?
                                <option value="TIME" selected>TIME</option> :
                                <option value="TIME">TIME</option>
                              }
                            </select>
                            <div className={styles.timeInput} style={{display: "flex"}}>
                              <input placeholder="Time" id={`${item._id}timeInput`} style={item.status === "TIME" ? {display: "block"} : {display: "none"}} onClick={(e)=>handleClickTimeInput(e,item._id)} value={item.timeReady} onBlur={(e)=>handleBlur(`${item._id}status`)}  onKeyDown={(e)=>checkSubmit(e, `${item._id}timeInput`, `${item._id}status`)} onChange={(e) => handleTime(e,item._id, indx)}></input>
                            </div>
                          </form>
                           <h4 className={styles["trailer-type"]} style={{fontWeight: '100'}}>{item.trailerType}</h4>
                           <h4 className={styles["driver-name"]}style={{paddingLeft: '.5vw', fontWeight: '100', margin: '0', }}>{item.driverName}</h4>
                          </div>
                          </div>

                          <div>    
                          </div>

                          <div onClick={(e) => handleClick(item._id)}>
                              <div className={styles["drop-down"]} onClick={(e)=>changeVisible(e,item._id)}>
                                <SlArrowDown id={`${item._id}downArrow`} style={{display : "block", margin: '.2rem', color: 'rgb(217,217,217)'}}/>
                                <SlArrowUp id={`${item._id}upArrow`} style={{display : "none", margin: '.2rem', color: 'rgb(217,217,217)'}}/>

                              </div>

                          </div>


                          <div id={item._id} className={styles["truck-body"]} style={{display: truckVisible, justifyContent: 'center'}}>
                            <span className={styles.line}></span>
                            <div className={styles["truck-body1"]}>
                              <div style={{backgroundColor: 'hsl(226, 12%, 21%)',  overflowWrap:'break-word', maxHeight: '3vh', alignItems:'center', display: 'flex', justifyContent:'center'}}>
                                <h4>TN</h4>
                                <p style={{paddingLeft:'.2vw', width: 'auto', margin: '0'}}>{item.trailerNum}</p>
                              </div>
                              <div style={{backgroundColor: 'hsl(226, 12%, 21%)', overflowWrap:'break-word', maxHeight: '3vh', alignItems:'center', display:'flex', justifyContent:'center'}}>
                                <h4>TR</h4>
                                <p style={{paddingLeft:'.2vw', width: 'auto', margin: '0'}}>{item.truckNum}</p>
                              </div >
                              <div style={{backgroundColor: 'hsl(226, 12%, 21%)', overflowWrap:'break-word', maxHeight: '3vh', alignItems:'center', display: 'flex', justifyContent: 'center'}}>
                                <MdPhoneEnabled size={10} style={{paddingLeft:''}}/>
                                <p style={{paddingLeft: '.3vw',  width: 'auto', margin: '0'}}>{item.phoneNum}</p>  
                              </div>
                              <div style={{backgroundColor: 'hsl(226, 12%, 21%)', overflowWrap:'break-word', maxHeight: '3vh', alignItems:'center', display: 'flex', justifyContent: 'center'}}>
                                <MdOutlineOpenInNew size={10} style={{paddingLeft:''}}/>
                                <p style={{paddingLeft: '.3vw',  width: 'auto', margin: '0'}}>More Info</p>
                              </div>
                            </div>
                            <div className={styles.notes}>
                            <input placeholder = "Notes" id={`${item._id}notesInput`} value={item.notes} onChange={(e)=> handleNotes(e,item._id, indx, e.target.value)}/>
                            </div>
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
<buttton onClick={loadOneDay} style={{backgroundColor: "white"}}>load one day</buttton>
<buttton onClick={loadMoreDays} style={{backgroundColor: "white"}}>load more days</buttton>
</div>

      </DragDropContext>
    </div>
    
  );
}


export default App;
import React,{useState,useEffect} from "react";
import axios, { all } from "axios";
import {Link} from "react-router-dom";
import styles from "../styles/MyTrucks.module.css";
import NewTruckForm from "./NewTruckForm";
import EditTruck from "./EditTruck";
import HeaderMyTrucks from "./HeaderMyTrucks"
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { SlMagnifier } from "react-icons/sl";
import { CiFilter } from "react-icons/ci";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";






const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editTruck, setEditTruck] = useState(null);
    const [checkVisible, setCheckVisible] = useState("none")
    const [selectedTrucks, setSelectedTrucks] = useState([]);
    const [buttonsVisibile, setButtonsVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState("none")
    const [filterVisible, setFilterVisible] = useState("none")
    const navigate = useNavigate();



    useEffect(()=>{
        axios.get("http://localhost:8000/api/User", {withCredentials: true})
        .then((result1)=>{
            const email = result1.data.email;
            axios.get(`http://localhost:8000/api/TrucksByUserID/${email}`,{withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    if(item.dateReady !== "Confirm"){
                        const d = new Date(item.dateReady)
                        console.log(d, "this is the date object being made everytime truck list loops")
                        newTrucks.push({
                            ...item, 
                            dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                        })
                    }
                    else{
                        newTrucks.push({
                            ...item, 
                            dateReady: "Confirm"
                        })
                    }
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })

        })
        .catch(err=>{
            navigate("/")
            console.log(err)
        })
    },[editTruck])



    const handleClick = (id) => {
        // Toggle visibility of arrows
        
        if(document.getElementById(`${id}blankBox`).style.display === "none"){
            let filteredTrucks = selectedTrucks.filter((truck) => truck !== id);
            if(filteredTrucks.length <= 0){
                setButtonsVisible(false)
            }
            setSelectedTrucks(filteredTrucks);
            document.getElementById(`${id}blankBox`).style.display = "block"
            document.getElementById(`${id}checkBox`).style.display = "none"
        }
        else{
            let newTrucks = [...selectedTrucks, id];
            setButtonsVisible(true)
            setSelectedTrucks(newTrucks)
            document.getElementById(`${id}blankBox`).style.display = "none"
            document.getElementById(`${id}checkBox`).style.display = "block"
        }
    };
    const selectAll =()=>{
        if(checkVisible === "none"){
            setCheckVisible("true")
            setSelectedTrucks(()=>{
                let truckIds = []
                trucks.forEach((truck,idx)=>{
                    truckIds.push(truck._id)
                })
                return truckIds
            });
            setButtonsVisible(true)
        }
        else{
            setCheckVisible("none")
            setSelectedTrucks([]);
            setButtonsVisible(false)
        }
    }

    const searchClick = () => {
        if (searchVisible === "none") {
            setSearchVisible("block");
        } else {
            setSearchVisible("none");
        }
    };

    const filterClick = () => {
        if (filterVisible === "none") {
            setFilterVisible("block");
        } else {
            setFilterVisible("none");
        }
    };

    const searchTrucks = (searchParam)=>{
        console.log(searchParam, "searchParam")
        if(searchParam){
            document.getElementById("Ttype").value = "all";
            document.getElementById("endorsements").value = "all";
            axios.get(`http://localhost:8000/api/SearchTrucks/${searchParam}`, {withCredentials: true})
        .then((result)=>{
            console.log(result.data)
            const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
        })
        .catch(err=>{
            console.log(err)
        })
        }
        if(!searchParam){
            document.getElementById("Ttype").value = "all";
            document.getElementById("endorsements").value = "all";
            axios.get("http://localhost:8000/api/findTrucksById", {withCredentials: true})
            .then((result)=>{
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    const filterTrucks = (e, trailerType, endorsements) =>{
        console.log("filter trucks function being called")
        console.log(trailerType, "trailer type")
        console.log(endorsements, "endorsements")
        axios.get(`http://localhost:8000/api/filterTrucks/${trailerType}/${endorsements}`, {withCredentials: true})
             .then((result)=>{
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })
            
    }
    const addToBoard =(e)=>{
        e.preventDefault();
        console.log(selectedTrucks, "selected trucks to be added")
        selectedTrucks.forEach((truck,idx)=>{
            document.getElementById(`${truck}blankBox`).style.display = "block"
            document.getElementById(`${truck}checkBox`).style.display = "none"
            console.log(truck, "iteration per truck adding to board")
            axios.put("http://localhost:8000/api/addToBoard",{truck})
            .then((result)=>{
                console.log(result)
                setTrucks(prevTrucks=>{
                    const tempTrucks = [...prevTrucks]
                    tempTrucks.forEach((truck, idx)=>{
                        if(truck._id === result.data._id){
                            truck.onBoard = "true"
                        }
                    })
                    return tempTrucks
                })
            })
            .catch(err=>{
                console.log(err)
            })
        })
        setSelectedTrucks([]);
        setButtonsVisible(false);
        setCheckVisible("none");
        
    }
    const deleteTrucks =(e)=>{
        e.preventDefault();
        selectedTrucks.forEach((truck,idx)=>{
            document.getElementById(`${truck}blankBox`).style.display = "block"
            document.getElementById(`${truck}checkBox`).style.display = "none"
            axios.delete(`http://localhost:8000/api/deleteById/${truck}`)
            .then((result)=>{
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        setTrucks(()=>{
            return trucks.filter(truck => !selectedTrucks.includes(truck._id));

        })
        
        setCheckVisible("none");
        setButtonsVisible(false);
        setSelectedTrucks([]);
    }

    const handleNotes = (e, truckId, notes)=>{
        e.preventDefault()

        setTrucks(prevTrucks =>{
            const newTrucks = [...prevTrucks]

            newTrucks.forEach((itm, idx)=>{
                if(truckId === itm._id){
                    itm.notes = document.getElementById(`${truckId}notesInput`).value
                }
            })
            return newTrucks
        })
    axios.put("http://localhost:8000/api/updateNotes", {truckId, notes})
      .then((result)=>{
        console.log(result)
      })
      .catch(err=>{
        console.log(err)
      })
    }


    return(
        <div>
        <HeaderMyTrucks/>
        <div className={openForm === false && editTruck === null ? "" : styles.overlay}>
        </div>
        <div className={styles.page}>
       <div className={styles.aboveList}>
        <div className={styles["aboveList-left"]}> 
            <div className={styles.listSearch}>
                <SlMagnifier size={25}  onClick={() => searchClick ()} className={styles.SlMagnifier} style={{cursor: 'pointer', color: searchVisible === "block" ? "rgb(237, 237, 237)": ""}}/>
                <p onClick={() => searchClick ()} style={{ display: searchVisible === "block" ? "none": "block", cursor: 'pointer'}}>Search</p>
                <input type="search" placeholder="Search" onChange={(e)=>searchTrucks(e.target.value)} style={{ display: searchVisible === "block" ? "block" : "none", marginLeft: '1vw'}}/>
            </div>
            <div className={styles["listFilter-icon"]}> 
                <CiFilter size={30} onClick={() => filterClick ()} style={{cursor: 'pointer', marginLeft: '2vw', color: filterVisible === "block" ? "rgb(237, 237, 237)": ""}}/> 
                <p onClick={() => filterClick ()} style={{ display: filterVisible === "block" ? "none" : "block", cursor:'pointer'}}>Filter</p>
            </div>
            <div className={styles.listFilter} style={{ display: filterVisible === "block" ? "block" : "none"}}> 
                <form onChange={(e)=>filterTrucks(e, document.getElementById("Ttype").value, document.getElementById("endorsements").value)}>
                <label for="Ttype">Trailer Type</label>
                <select defaultValue={"all"} name="Ttype" id="Ttype" >
                    <option value={"all"} >All</option>
                    <option value="V">V</option>
                    <option value="R">R</option>
                </select>
                <label for="Ttype">Endorsements</label>
                <select defaultValue={"all"} name="endorsements" id="endorsements">
                    <option value={"all"} >All</option>
                    <option value="Hazmat" >Hazmat</option>
                    <option value="Tanker" >Tanker</option>
                    <option value="DT" >Doubles/Triples</option>
                </select>
                </form>

        </div>
        </div>
        <div className={styles["aboveList-Right"]}> 
            <button onClick={() => setOpenForm(true)} className={styles.openBtn} style={{}}>Add Driver</button>
        
            {
                buttonsVisibile?
                <div style={{display:'flex'}}>
                    <button onClick={(e)=>addToBoard(e)} className={styles.openBtn1}>Add To Board</button>
                    <button onClick={(e)=>deleteTrucks(e)} className={styles.openBtn2}>Delete</button>
                </div>
                :<></>
            }
         </div>
        <div> 
          <NewTruckForm open={openForm} setOpenForm={setOpenForm} trucks={trucks} setTrucks={setTrucks} onClose={()=> setOpenForm(false)} style={{zIndex:'12'}}/>
        </div> 
        </div>
       </div>
       <div className={styles.list}>
       <div className={styles.tableHeader}>
       <div onClick={(e) => selectAll(e)} className={styles.selectAllBox}>
                                        {
                                            checkVisible === "none"?
                                            <MdCheckBoxOutlineBlank className={styles.iconCheck} size={20} style={{ display:"block", justifyContent: 'start', cursor: 'pointer'}}/>
                                            :
                                            <MdCheckBox size={20} style={{ display:"block", justifyContent: 'start', cursor: 'pointer'}}/>
                                        }
                                        
        </div> 
        <div className={styles.columnValues}>
        <h3> Name </h3>
        <h3> Truck Number </h3>
        <h3> Trailer Number </h3>
        <h3> Date Ready </h3>
        <h3> On Board </h3>
       </div>
       </div>
            {
                trucks?
                    trucks.map((itm, idx)=>{
                        return<div>
                            <div className={styles["list-itemsContainer"]}> 
                            <div key={idx} className={styles["list-items"]}>
                             <div onClick={(e) => handleClick(itm._id)} className={styles.checkBox}>
                                        {
                                            checkVisible === "none"?
                                            <div>
                                                <MdCheckBoxOutlineBlank className={styles.iconCheck} size={20} id={`${itm._id}blankBox`} style={{ display: "block", justifyContent: 'start', cursor: 'pointer'}}/>
                                                <MdCheckBox size={20} id={`${itm._id}checkBox`} style={{ display: "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                            </div>
                                            :
                                            <div>
                                                <MdCheckBoxOutlineBlank className={styles.iconCheck} size={20}  id={`${itm._id}blankBox`} style={{ display: "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                                <MdCheckBox size={20} id={`${itm._id}checkBox`} style={{ display: "block", justifyContent: 'start', cursor: 'pointer'}}/>
                                            </div>

                                        }
                                    </div>
                   

                                <div id={`${itm._id}truckData`} className={styles.truckdata} onMouseOver={(e)=>document.getElementById(`${itm._id}editButton`).style.display = "block"} onMouseOut={(e)=>document.getElementById(`${itm._id}editButton`).style.display = "none"} >

                                    <div style={{justifySelf:'start'}}>{itm.driverName}</div>
                                    <div style={{justifySelf:'start'}} >{itm.truckNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.trailerNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.dateReady}</div>
                                    <div style={{justifySelf:'start', display: "flex"}}>{itm.onBoard.toString()}
                                        <MdOutlineOpenInNew id={`${itm._id}editButton`} className={styles["icon-moreInfo"]} style={{display: "none"}} onClick={(e) => setEditTruck(itm)}/>
                                        <EditTruck  editTruck={editTruck} trailerType={itm.trailerType} editAdditionalInfo={itm.additionalInfo} setEditTruck={setEditTruck} editHomeLocation={itm.homeLocation} editPhoneNum={itm.phoneNum} editDriverName={itm.driverName} editTrailerNum={itm.trailerNum} editTruckNum={itm.truckNum} editDateReady={itm.dateReady} editEndorsements={itm.endorsements} trucks={trucks} setTrucks={setTrucks}/>
                                    </div>
                                </div>
                         
                        
                    
                    
                
                        </div>
                            <div className={styles.notes}>
                                <textarea placeholder="Notes" id={`${itm._id}notesInput`}  value={itm.notes} onChange={(e)=> handleNotes(e,itm._id, e.target.value)} />
                            </div>
                        </div>
                        </div>
                    })
                    :<></>
            }
        </div>
        <div className={styles.footer}>
            {/* <p>Load More</p> */}
        </div>
        
        </div>
    
    );
}
export default MyTrucks;
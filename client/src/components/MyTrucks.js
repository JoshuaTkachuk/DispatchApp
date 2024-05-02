import React,{useState,useEffect} from "react";
import axios, { all } from "axios";
import {Link} from "react-router-dom";
import "../styles/MyTrucks.css";
import NewTruckForm from "./NewTruckForm";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";




const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const [checkVisible, setCheckVisible] = useState("none")
    const [selectedTrucks, setSelectedTrucks] = useState([]);
    const [buttonsVisibile, setButtonsVisible] = useState(false);


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

        })
        .catch(err=>{
            console.log(err)
        })
    },[])



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


    return(
        <div>
        <div className={openForm === false ? "" : "overlay"}>
        </div>
        <div className="page" >
            <h1>Truck List</h1>
        <div className="links">  
            <Link to={"/home"} style={{color:'black', margin: '1rem', textDecoration: 'none'}}>Home</Link>
        <div>
        <div> 
            <button onClick={() => setOpenForm(true)} className="openBtn" >Add Truck</button>
        </div>
        </div>
        <div>
            <input type="search" placeholder="Search" onChange={(e)=>searchTrucks(e.target.value)}/>
        </div>
        <form onChange={(e)=>filterTrucks(e, document.getElementById("Ttype").value, document.getElementById("endorsements").value)}>
            <label for="Ttype">Trailer Type:</label>
            <select defaultValue={"all"} name="Ttype" id="Ttype" >
                <option value={"all"} >all</option>
                <option value="V">V</option>
                <option value="R">R</option>
            </select>
            <label for="endorsements">Endorsements:</label>
            <select defaultValue={"all"} name="endorsements" id="endorsements">
                <option value={"all"} >all</option>
                <option value="Hazmat" >Hazmat</option>
                <option value="Tanker" >Tanker</option>
                <option value="DT" >Doubles/Triples</option>
            </select>
        </form>
            {
                buttonsVisibile?
                <div>
                    <button onClick={(e)=>addToBoard(e)}>add to board</button>
                    <button onClick={(e)=>deleteTrucks(e)} >delete</button>
                </div>
                :<></>
            }
        <div> 
          <NewTruckForm open={openForm} trucks={trucks} setTrucks={setTrucks} onClose={()=> setOpenForm(false)} style={{zIndex:'12'}}/>  
        </div> 
        </div>

       <div className="list">
       <div className="tableHeader">
       <div onClick={(e) => selectAll(e)} className="selectAllBox">
                                        {
                                            checkVisible === "none"?
                                            <MdCheckBoxOutlineBlank style={{ display:"block", justifyContent: 'start', cursor: 'pointer'}}/>
                                            :
                                            <MdCheckBox style={{ display:"block", justifyContent: 'start', cursor: 'pointer'}}/>
                                        }
                                        
        </div> 
        <div className="columnValues">
        <h3> Name </h3>
        <h3> Truck Number </h3>
        <h3> Trailer Number </h3>
        <h3> Date Ready </h3>
       </div>
       </div>
            {
                trucks?
                    trucks.map((itm, idx)=>{
                        return<div key={idx} className="list-items">
                             <div onClick={(e) => handleClick(itm._id)} className="checkBox">
                                        {
                                            checkVisible === "none"?
                                            <div>
                                                <MdCheckBoxOutlineBlank id={`${itm._id}blankBox`} style={{ display: "block", justifyContent: 'start', cursor: 'pointer'}}/>
                                                <MdCheckBox id={`${itm._id}checkBox`} style={{ display: "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                            </div>
                                            :
                                            <div>
                                                <MdCheckBoxOutlineBlank id={`${itm._id}blankBox`} style={{ display: "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                                <MdCheckBox id={`${itm._id}checkBox`} style={{ display: "block", justifyContent: 'start', cursor: 'pointer'}}/>
                                            </div>

                                        }
                                    </div>
                   
                                <div className="truckdata">
                                    <div style={{justifySelf:'start'}}>{itm.driverName}</div>
                                    <div style={{justifySelf:'start'}} >{itm.truckNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.trailerNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.dateReady}</div>

                                </div>
                         
                        
                    
                            

                
                        </div>
                    })
                    :<></>
            }
        </div>
        <div className="footer">
            <p>Next Page</p>
        </div>
        
        </div>
        </div>
    
    );
}
export default MyTrucks;
import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/MyTrucks.css";
import NewTruckForm from "./NewTruckForm";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";




const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const [checkVisible, setCheckVisible] = useState("none")

    const [selected, setSelected] = useState([]);
    const [user,setUser] = useState([]);


    useEffect(()=>{
        axios.get("http://localhost:8000/api/User", {withCredentials: true})
        .then((result1)=>{
            setUser(result1.data);
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

    const addToBoard =(id)=>{
        axios.put("http://localhost:8000/api/addToBoard",{id})
        .then((result)=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    const handleClick = (e) => {
        // Toggle visibility of arrows
        if (checkVisible === "none") {
            setCheckVisible("block");
        } else {
            setCheckVisible("none");
        }
    };
    const searchTrucks = (searchParam)=>{
        console.log(searchParam, "searchParam")
        if(searchParam){
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


    return(
        <div>
        <div className={openForm == false ? "" : "overlay"}>
        </div>
        <div className="page" >
        <div>
            <h1>Truck List</h1>
        </div>
        <div className="headerTop-right"> 
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
        <div> 
          <NewTruckForm open={openForm} onClose={()=> setOpenForm(false)} style={{zIndex:'12'}}/>  
        </div> 
        </div>
       </div>

       <div className="list">
       <div className="tableHeader">
       <div onClick={(e) => handleClick (e)} className="selectAllBox">
                                        <MdCheckBoxOutlineBlank style={{ display: checkVisible === "none" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                        <MdCheckBox style={{ display: checkVisible === "block" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
        </div> 
        <div className="columnValues">
        <h3> Name </h3>
        <h3> Truck Number </h3>
        <h3> Trailer Number </h3>
        <h3> Date Ready </h3>
       </div>
       </div>
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx} className="list-items">
                             <div onClick={(e) => handleClick (e)} className="checkBox">
                                        <MdCheckBoxOutlineBlank style={{ display: checkVisible === "none" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                        <MdCheckBox style={{ display: checkVisible === "block" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                    </div>
                   
                                <div className="truckdata">
                                    <div style={{justifySelf:'start'}}>{itm.driverName}</div>
                                    <div style={{justifySelf:'start'}} >{itm.truckNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.trailerNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.dateReady}</div>

                                </div>
                         
                            <div>
                            <button onClick={(e)=> addToBoard(itm._id)} className="add-button">Add To Board</button>
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
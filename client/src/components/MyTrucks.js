import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/MyTrucks.css";
import NewTruckForm from "./NewTruckForm";



const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [openForm, setOpenForm] = useState(false);

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

    const addToBoard =(id)=>{
        axios.put("http://localhost:8000/api/addToBoard",{id})
        .then((result)=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
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
          <NewTruckForm open={openForm} onClose={()=> setOpenForm(false)} style={{zIndex:'12'}}/>  
        </div> 
        </div>
       </div>

       <div className="list">
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx} className="list-items">
                   
                                <div className="truckdata" style={{paddingTop: '3vh'}}>
                                    <div >{itm.driverName}</div>
                                    <div >{itm.truckNum}</div>
                                    <div >{itm.trailerNum}</div>
                                    <div >{itm.dateReady}</div>

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
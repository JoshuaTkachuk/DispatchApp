import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/MyTrucks.css"

const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);

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
        <div className="list">
            <h1>My Trucks</h1>
        <div className="links">  
            <Link to={"/home"} style={{color:'blue', margin: '1rem'}}>Home</Link>
            <Link to={"/addTruck"} style={{color:'blue', margin: '1rem'}}>Add Truck</Link>
       </div>
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx} className="table" style={{borderbottom: '1px solid #000'}}>
                            <table stle={{margin:'0auto'}}>
                                <tr>
                                    <td>{itm.driverName}</td>
                                    <td>{itm.truckNum}</td>
                                    <td>{itm.trailerNum}</td>
                                    <td>{itm.dateReady}</td>

                                </tr>
                            </table>
                            <div>
                            <button onClick={(e)=> addToBoard(itm._id)} style={{padding: '6px', borderRadius:'1vw', backgroundcolor: 'blue', border: 'none'}}>Add To Board</button>
                            </div>
                        </div>
                    })
                    :<></>
            }
          
        </div>
    );
}
export default MyTrucks;
import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/allTrucks")
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
            <h1>My Trucks</h1>
            <Link to={"/"}>Home</Link>
            <Link to={"/addTruck"}>addTruck</Link>
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx}>
                            <table>
                                <tr>
                                    <td>{itm.driverName}</td>
                                    <td>{itm.truckNum}</td>
                                    <td>{itm.trailerNum}</td>
                                    <td>{itm.dateReady}</td>
                                </tr>
                            </table>
                            <button onClick={(e)=> addToBoard(itm._id)}>add to list</button>
                        </div>
                    })
                    :<></>
            }
        </div>
    );
}
export default MyTrucks;
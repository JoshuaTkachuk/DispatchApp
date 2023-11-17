import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Home.css";
import "../scripts/HomeScripts.js";

const Home=()=>{
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const numRows = daysOfWeek.length;

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

    
    return(
        <div>
            <h1>USKO truck board is Red</h1>
            <Link to={"/myTrucks"}>My Trucks</Link>
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx}>
                            <table>
                                <tr>
                                    <td>{itm.driverName}</td>
                                    <td>{itm.truckNum}</td>
                                    <td>{itm.trailerNum}</td>
                                </tr>
                            </table>
                            <button onClick={(e)=> removeFromBoard(itm._id)}>remove From board</button>
                        </div>
                    })
                    :<></>
            }
        </div>
    );
    }
export default Home
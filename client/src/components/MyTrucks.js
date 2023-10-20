import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/allTrucks")
        .then((result)=>{
            console.log(result.data)
            setTrucks(result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

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
                                </tr>
                            </table>
                            <button>add to list</button>
                        </div>
                    })
                    :<></>
            }
        </div>
    );
}
export default MyTrucks;
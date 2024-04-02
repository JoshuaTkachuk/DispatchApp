import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Dnd from "./Dnd"
import "../styles/Home.css"

const Home=()=>{
    const navigate = useNavigate();

    const logout =(e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout",{}, {withCredentials: true})
        .then((result)=>{
            console.log(result);
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    
    return(
        <div>
        <div className="mainheader">
            <h1>USKO Truck Board</h1>
            <button onClick={logout} className="logout" style={{position: 'absolute', right:'3vw', top: '3vw', padding: '.75vh .75vw .75vh .75vw', borderRadius:'.5vw', border: 'none'}}>logout</button>
            <div>
                <button className="mytruck-link">
                    <Link to={"/myTrucks"} style={{textDecoration: 'none', color: 'blue'}}> My trucks</Link>
                </button>
            </div>
            </div>
            <Dnd/>
            {
                // trucks.length > 0?
                //     trucks.map((itm, idx)=>{
                //         return<div key={idx}>
                //             <table>
                //                 <tr>
                //                     <td>{itm.driverName}</td>
                //                     <td>{itm.truckNum}</td>
                //                     <td>{itm.trailerNum}</td>
                //                 </tr>
                //             </table>
                //             {/* <button onClick={(e)=> removeFromBoard(itm._id)}>remove From board</button> */}
                //             {/*removed delete funtion to Dnd Component to be able to remove the truck from the truck list */}
                //         </div>
                //     })
                //     :<></>

                // removed truck list and implemented it into the Dnd component to be able to manipulate it with state
            }

        </div>
    );
}
export default Home
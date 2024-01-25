import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Dnd from "./Dnd"
import "../styles/Home.css"

const Home=()=>{

    // const [trucks,setTrucks] = useState([]);

    // useEffect(()=>{
    //     axios.get("http://localhost:8000/api/allTrucks")
    //     .then((result)=>{
    //         console.log(result.data)
    //         console.log(result.data.filter(truck => truck.onBoard == true))
    //         setTrucks(result.data.filter(truck => truck.onBoard == true))
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // },[])
    
    //removed useEffect and added to Dnd component so state will update within the component rather than passing props to it

    // const removeFromBoard =(id)=>{
    //     axios.put("http://localhost:8000/api/removeFromBoard",{id})
    //     .then((result)=>{
    //         console.log(result.data)
    //         setTrucks(trucks.filter(truck => truck._id != id))
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }

    
    return(
        <div className="mainheader">
            <h1>USKO Truck Board</h1>
            <Link to={"/myTrucks"}>My Trucks</Link>
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
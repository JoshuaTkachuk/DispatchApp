import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Dnd from "./Dnd"
import Header from "./Header"

const Home=()=>{
  

    
    return(
        <div>
        <Header/>
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
import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Home.css";
import "../scripts/HomeScripts.js";

const Home=()=>{
    
    const [trucks,setTrucks] = useState([]);

    
    return(
        <div>
            <h1>USKO truck board is Red</h1>
            <Link to={"/myTrucks"}>My Trucks</Link>
        </div>
    );
}
export default Home
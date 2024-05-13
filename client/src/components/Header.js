import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Dnd from "./Dnd"
import "../styles/Header.css"


const Logout=()=>{
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


<div className="mainHeader"> 
    <img src="images/UskoLogo.png"/>
    <h2>Home</h2> 
    <div className="tbdBox">
         <p>Schedule</p>
    </div> 
    <div className="mainHeader-right">
        <button className="mytruck-link">
                    <Link to={"/myTrucks"} style={{textDecoration: 'none', color: 'rgb(237,237,237'}}> Truck List</Link>
        </button>
        <button onClick={logout} className="logout" >logout</button>
    </div>

</div>

    );
}

export default Logout;
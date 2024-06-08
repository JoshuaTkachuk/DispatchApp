import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "../styles/HeaderMyTrucks.module.css";


const Logout2=()=>{
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


<div className={styles.mainHeader}> 
    <img src="images/UskoLogo.png"/>
    <h2>Truck List</h2>  
    <div className={styles["mainHeader-right"]}>
        <button className={styles["mytruck-link"]}>
                    <Link to={"/Home"} style={{textDecoration: 'none', color: 'rgb(237,237,237'}}>Home</Link>
        </button>
        <button onClick={logout} className={styles.logout} >logout</button>
    </div>

</div>

    );
}

export default Logout2;
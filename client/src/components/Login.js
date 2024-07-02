import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/Login.module.css";

const Login=()=>{

    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors,setErrors] = useState("");
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/login",{email: email, password: password},{withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                navigate(`/home`);
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return(
        <div className={styles.loginForm}>
            <div className={styles.formHeader}>
            <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit} className={styles.formOptions}>
                    <input type={"text"} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type={"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type={"submit"} className={styles.loginButton} style={{textDecoration:'none'}}>Login</button>
            </form>
            <div className={styles.newUser}>
                <p>Don't have an account?</p>
                <Link to={'/'}>Register</Link>
            </div>
        </div>
    );
}
export default Login;
import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

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
        <div className="loginFormm">
            <div className="formHeaderr">
            <h1>Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="formOptionss">
                    <input type={"text"} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type={"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type={"submit"} className="loginButton" style={{textDecoration:'none'}}>Login</button>
            </form>
            <div className="newUser">
                <h4>Don't have an account?</h4>
                <Link to={'/'}>Register</Link>
            </div>
        </div>
    );
}
export default Login;
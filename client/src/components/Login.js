import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <input type={"text"} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type={"password"} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type={"submit"}>Login</button>
                </div>   
            </form>
            <div>
                <h3>Don't have an account?</h3>
                <Link to={'/'}>Register</Link>
            </div>
        </div>
    );
}
export default Login;
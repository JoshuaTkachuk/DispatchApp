import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {email,password,confirmPassword}, {withCredentials: true})
            .then((result)=>{
                console.log(result)
                navigate("/home")
            })
            .catch(err=>{
                console.log(err)
            })

    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label for="email">Email: </label>
                <input id="email" onChange={(e)=>setEmail(e.target.value)}/>
                
                <label for="password">Password: </label>
                <input id="password" onChange={(e)=> setPassword(e.target.value)}/>

                <label for="confirmPassword">Confirm Password: </label>
                <input id="confirmPassword" onChange={(e)=> setConfirmPassword(e.target.value)}/>

                <button type="submit"> Submit </button>
            </form>
        </div>
    );

}
export default Register;

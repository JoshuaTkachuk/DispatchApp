import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import DndList from "./DndList"
import Dnd from "./Dnd"

const Home=()=>{

    const [listVisible, setListVisible] = useState();
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/User", {withCredentials: true})
        .then(results=>{
            setListVisible(results.data.defaultView)
            console.log(results)
        })
        .catch(err=>{
            console.log(err)
        })
    },[listVisible])

    
    
    const toggleComponents = () => {
        setListVisible(!listVisible)
        axios.put("http://localhost:8000/api/editDefaultView", {defaultView: !listVisible}, {withCredentials: true})
        .then(results=>{
            console.log(results, "list visible being changed")
        })
        .catch(err=>{
            console.log(err)
        })
    };

    return(
        <div>
            {listVisible ? <Dnd toggleComponents={toggleComponents}/> : <DndList toggleComponents={toggleComponents}/>} 

        </div>
    );
}
export default Home
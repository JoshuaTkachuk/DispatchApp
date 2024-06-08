import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import DndList from "./DndList"
import Dnd from "./Dnd"

const Home=()=>{

    const [listVisible, setListVisible] = useState(true);
    
    const toggleComponents = () => {
        setListVisible(!listVisible);
    };

    return(
        <div>
            {listVisible ? <Dnd toggleComponents={toggleComponents}/> : <DndList toggleComponents={toggleComponents}/>} 

        </div>
    );
}
export default Home
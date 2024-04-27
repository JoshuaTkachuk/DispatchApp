import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/NewTruckForm.css";
import { HiOutlineXMark } from "react-icons/hi2";

const NewTruckForm=({ open, onClose })=>{
    
    const [trucks,setTrucks] = useState([]);
    const [truckNum,setTruckNum] = useState("");
    const [trailerNum,setTrailerNum] = useState("");
    const [driverName,setDriverName] = useState("");
    const [phoneNum,setPhoneNum] = useState("");
    const [homeLocation,setHomeLocation] = useState("");
    const [dateReady, setDateReady] = useState("");
    const [tType, setTType] = useState("V");

    const submithandler=(e)=>{
        e.preventDefault();
        let T = document.getElementById("T");
        let H = document.getElementById("H");
        let DT = document.getElementById("DT");
        let endorsements = [];

        if(T.hasAttribute("checked")){
            console.log(T.value, "tanker value")
            endorsements.push(T.value)
        }
        if(H.hasAttribute("checked")){
            console.log(H.value, "hazmat value")
            endorsements.push(H.value)
        }
        if(DT.hasAttribute("checked")){
            console.log(DT.value, "doubles/triples value")
            endorsements.push(DT.value)
        }
        axios.post("http://localhost:8000/api/truck", {truckNum,trailerNum,driverName,phoneNum,endorsements,homeLocation,dateReady, trailerType: tType}, {withCredentials: true})
            .then((result)=>{
                console.log(result.data)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    const setChecked=(id)=>{
        console.log(id)
        let endorsement = document.getElementById(id);
        console.log(endorsement);

        if (endorsement.hasAttribute("checked")){
            endorsement.removeAttribute("checked")
            console.log(endorsement, "removing checked attribute")
        }
        else{
            endorsement.setAttribute("checked", "checked")
            console.log(endorsement, "adding checked attribute")
            
        }

    }
    
    if(!open) return null

    return(
        <div>
        <div className="popupForm" style={{zIndex:'12'}}>
        <div className="formHeader">
            <h1>New Truck</h1>
            <p onClick={onClose} className="closeBtn"> <HiOutlineXMark style={{ fontSize:'4vh'}}/> </p>

        </div>
        <div className="form" >
            <form onSubmit={submithandler}>

                <div className="tType">
                    <div for="Ttype">Trailer Type</div>
                    <select name="Ttype" id="Ttype" value={tType} onChange={(e)=> setTType(e.target.value)}>
                        <option value={"R"}>R</option>
                        <option selected value={"V"}>V</option>
                    </select>
                </div>
                <div className="formbody1">
                    <input placeholder="truck number" onChange={(e)=>setTruckNum(e.target.value)}></input>
                    <input placeholder="trailer number" onChange={(e)=>setTrailerNum(e.target.value)}></input>
                </div>
                <div className="formbody2">
                    <input placeholder="name" onChange={(e)=>setDriverName(e.target.value)}></input>
                    <input placeholder="phone number" onChange={(e)=>setPhoneNum(e.target.value)} ></input>
                </div> 
                <div className="formbody3">
                <div className="formbody3Left">
                    <input placeholder="home address" onChange={(e)=>setHomeLocation(e.target.value)}></input>
                </div>
                {/* <div className="dateReady">
                        <input type="date" id="date" onChange={(e)=> setDateReady(e.target.value)}/>
                </div> */}
                <div className="endorsements">
                    <input name="endorsements" id="T" value="Tanker" type="checkbox" onChange={(e)=>setChecked("T")}>
                    </input>
                        <label for="T">tanker</label>

                    <input name="endorsements" id="H" value="Hazmat" type="checkbox" onChange={(e)=>setChecked("H")}>
                    </input>
                        <label for="H">hazmat</label>

                    <input name="endorsements" id="DT" value="Doubles/Triples" type="checkbox" onChange={(e)=>setChecked("DT")}>
                    </input>
                        <label for="DT">doubles/triples</label>
                    </div>
                    </div>
                        <div className="truckNotes">
                            <input></input>
                        </div>
                    <button type="submit" className="buttonSubmit">Submit</button>
                </form>
          
                </div>
            </div>
        </div>
       
     
    );
}
export default NewTruckForm;
import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const NewTruckForm=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [truckNum,setTruckNum] = useState("");
    const [trailerNum,setTrailerNum] = useState("");
    const [driverName,setDriverName] = useState("");
    const [phoneNum,setPhoneNum] = useState("");
    const [endorsements,setEndorsements] = useState([]);
    const [homeLocation,setHomeLocation] = useState("");

    const submithandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/truck", {truckNum,trailerNum,driverName,phoneNum,endorsements,homeLocation})
            .then((result)=>{
                console.log(result.data)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    
    return(
        <div>
            <h1>New Truck</h1>
            <form onSubmit={submithandler}>
                <label for="Ttype">trailer type</label>
                <select name="Ttype" id="Ttype">
                    <option value={"R"}>R</option>
                    <option value={"V"}>V</option>
                </select>
                <input placeholder="truck number" onChange={(e)=>setTruckNum(e.target.value)}></input>
                <input placeholder="trailer number" onChange={(e)=>setTrailerNum(e.target.value)}></input>
                <input placeholder="name" onChange={(e)=>setDriverName(e.target.value)}></input>
                <input placeholder="phone number" onChange={(e)=>setPhoneNum(e.target.value)}></input>
                <div>
                    <label for="T">tanker</label>
                    <input name="endorsements" id="T" value="Tanker" type="checkbox" onChange={(e)=>setEndorsements([...endorsements, e.target.value])}>
                    </input>

                    <label for="H">hazmat</label>
                    <input name="endorsements" id="H" value="Hazmat" type="checkbox" onChange={(e)=>setEndorsements([...endorsements, e.target.value])}>
                    </input>

                    <label for="DT">doubles/triples</label>
                    <input name="endorsements" id="DT" value="Doubles/Triples" type="checkbox" onChange={(e)=>setEndorsements([...endorsements, e.target.value])}>
                    </input>
                </div>
                <input placeholder="home address" onChange={(e)=>setHomeLocation(e.target.value)}></input>
                <button type="submit">submit</button>
            </form>
            <Link to={"/myTrucks"}>back</Link>
        </div>
    );
}
export default NewTruckForm;
import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "../styles/NewTruckForm.module.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const NewTruckForm=({ open, onClose, trucks, setTrucks })=>{
    
    const [truckNum,setTruckNum] = useState("");
    const [trailerNum,setTrailerNum] = useState("");
    const [driverName,setDriverName] = useState("");
    const [phoneNum,setPhoneNum] = useState("");
    const [homeLocation,setHomeLocation] = useState("");
    const [dateReady, setDateReady] = useState("");
    const [tType, setTType] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");

    const submithandler=(e)=>{
        e.preventDefault();
        let d = new Date(dateReady);
            d = new Date(d.setDate(d.getDate()))
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
        axios.post("http://localhost:8000/api/truck", {truckNum,trailerNum,driverName,phoneNum,endorsements,homeLocation,dateReady: d, trailerType: tType, additionalInfo}, {withCredentials: true})
            .then((result)=>{
                console.log(result.data, "new truck made")
                 d = new Date(d.setDate(d.getDate() + 1))
                 if( result.data.dateReady === "NaN/NaN/NaN"){
                    result.data.dateReady = "Confirm"
                 }
                 else{
                    result.data.dateReady = `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  (d.getDate() ) + "/" + d.getFullYear()}`
                 }
                
                setTrucks([...trucks, result.data])
            })
            .catch(error =>{
                console.log(error)
            })
    }
    const setChecked=(id)=>{
        console.log(id, "checked")
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
    const handleRadio =(e)=>{
        if(tType === e.target.value){
            setTType("")
        }
        else{
            setTType(e.target.value)
        }

    }
    
    if(!open) return null

    return(
        <div>
        <div className={styles.popupForm} style={{zIndex:'12'}}>
        <div className={styles.formHeader}>
            <h1>New Driver</h1>
            <p onClick={onClose} className={styles.closeBtn}> <HiOutlineXMark style={{ fontSize:'4vh'}}/> </p>

        </div>
        <div className={styles.form} >
            <form onSubmit={submithandler}>
                <div className={styles.formbody1}>
                    <input placeholder="truck number" onChange={(e)=>setTruckNum(e.target.value)}></input>
                    <input placeholder="trailer number" onChange={(e)=>setTrailerNum(e.target.value)}></input>
                </div>
                <div className={styles.formbody2}>
                    <input placeholder="name" onChange={(e)=>setDriverName(e.target.value)}></input>
                    <input placeholder="phone number" onChange={(e)=>setPhoneNum(e.target.value)} ></input>
                </div> 
                <div className={styles.formbody3}>
                <div className={styles.formbody3Left}>
                    <input placeholder="home address" onChange={(e)=>setHomeLocation(e.target.value)}></input>
                    <input placeholder="additional info" onChange={(e)=>setAdditionalInfo(e.target.value)}></input>
                </div>
                <div className={styles.formbody3Right}>
                <div className={styles.endorsements}>
                    <input /*style={{display: "none"}}*/ name="endorsements" id="T" value="Tanker" type="checkbox" onChange={(e)=>setChecked("T")}>
                    </input>

                        <label for="T">Tanker</label>

                    <input name="endorsements" id="H" value="Hazmat" type="checkbox" onChange={(e)=>setChecked("H")}>
                    </input>
                        <label for="H">Hazmat</label>

                    <input name="endorsements" id="DT" value="DT" type="checkbox" onChange={(e)=>setChecked("DT")}>
                    </input>
                        <label for="DT">Doubles/Triples</label>
                   
                    </div>
                    <div className={styles.tType}>
                    <div for="Ttype">Trailer Type</div>
                <label for="R">R</label>
                <input checked={tType === "R"} type="radio" id="R" name="Ttype" value="R" onClick={(e)=> handleRadio(e)}/>
                <label for="V">V</label>
                <input checked={tType === "V"} type="radio" id="V" name="Ttype" value="V" onClick={(e)=> handleRadio(e)}/>
                <label for="PO">PO</label>
                <input checked={tType === "PO"} type="radio" id="PO" name="Ttype" value="PO" onClick={(e)=> handleRadio(e)}/>
                <label for="VT">VT</label>
                <input checked={tType === "VT"} type="radio" id="VT" name="Ttype" value="VT" onClick={(e)=> handleRadio(e)}/>
                <label for="RT">RT</label>
                <input checked={tType === "RT"} type="radio" id="RT" name="Ttype" value="RT" onClick={(e)=> handleRadio(e)}/>
                    
                </div>
                <div className="dateReady">
                        <input type="date" id="date" onChange={(e)=> setDateReady(() =>{
                            let d = new Date(e.target.value)
                            d = new Date(d.setDate(d.getDate()))
                            return d
                        })}/>
                </div>
                    </div>
                    </div>
                    <button type="submit" className={styles.buttonSubmit}>Submit</button>         
                </form>
          
                </div>
            </div>
        </div>
       
     
    );
}
export default NewTruckForm;
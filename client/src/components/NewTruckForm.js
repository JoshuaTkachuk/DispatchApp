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
                console.log(result.data, "new truck made")
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
    
    if(!open) return null

    return(
        <div>
        <div className={styles.popupForm} style={{zIndex:'12'}}>
        <div className={styles.formHeader}>
            <h1>New Driver</h1>
            <p onClick={onClose} className={styles.closeBtn}> <HiOutlineXMark style={{ fontSize:'4vh'}}/> </p>
        </div>
        <p className={styles.driverInfo}>Driver Information</p>
        <div className={styles.form} >
            <form onSubmit={submithandler}>
                <div className={styles.formbody1}>
                    <input placeholder="name" onChange={(e)=>setDriverName(e.target.value)}></input>
                    <input placeholder="phone number" onChange={(e)=>setPhoneNum(e.target.value)} ></input>
                </div> 
                <div className={styles.formbody2}>
                    <input placeholder="truck number" onChange={(e)=>setTruckNum(e.target.value)}></input>
                    <input placeholder="trailer number" onChange={(e)=>setTrailerNum(e.target.value)}></input>
                </div>
                <div className={styles.formbody3}>
                  <input placeholder="home address" onChange={(e)=>setHomeLocation(e.target.value)}></input>
                </div>
                <div className={styles.formbody4}>
                    <p> Additional Notes</p>
                    <textarea></textarea>
                </div>
                <div className={styles.trailerTypes}>
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
                    <input /*style={{display: "none"}}*/ name="endorsements" id="T" value="Tanker" type="checkbox">
                    </input>

                        <label for="T">Tanker</label>
                    </div>
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
                    <input name="endorsements" id="H" value="Hazmat" type="checkbox" onChange={(e)=>setChecked("H")}>
                    </input>
                        <label for="H">Hazmat</label>
                    </div>
                    <div style={{display: 'flex', justifyContent:'center',alignItems: 'center'}}> 
                    <input name="endorsements" id="DT" value="DT" type="checkbox" onChange={(e)=>setChecked("DT")}>
                    </input>
                        <label for="DT">Doubles/Triples</label>
                    </div>   
                    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
                <div for="Ttype">Trailer Type</div>
                    <select name="Ttype" id="Ttype" value={tType} onChange={(e)=> setTType(e.target.value)} className={styles["tType-Select"]}>
                        <option value={"R"}>R</option>
                        <option selected value={"V"}>V</option>
                    </select> 
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
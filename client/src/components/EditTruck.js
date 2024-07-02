import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "../styles/NewTruckForm.module.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const EditTruck =({ editTruck, trucks, editAdditionalInfo, editHomeLocation, editPhoneNum, editDriverName, editTrailerNum, editTruckNum, setTrucks, trailerType, setEditTruck , editEndorsements, editDateReady}) =>{

    const [truckNum,setTruckNum] = useState(editTruckNum);
    const [trailerNum,setTrailerNum] = useState(editTrailerNum);
    const [driverName,setDriverName] = useState(editDriverName);
    const [phoneNum,setPhoneNum] = useState(editPhoneNum);
    const [homeLocation,setHomeLocation] = useState(editHomeLocation);
    const [dateReady, setDateReady] = useState(editDateReady);
    const [tType, setTType] = useState(trailerType);
    const [endorsements,setEndorsements] = useState(editEndorsements);
    const [additionalInfo, setAdditionalInfo] = useState(editAdditionalInfo);

    const submithandler=(e)=>{
        e.preventDefault();
        let realDate
         let d = new Date(dateReady);
            d = new Date(d.setDate(d.getDate()))
         let d2 = new Date(editDateReady)
         console.log(d, "this is the edited date")
         console.log(d2, "this is the original date ")
         if(d === d2){
             realDate = d2
         }
         else{
            realDate = new Date(d.setDate(d.getDate()))
         }
        axios.put(`http://localhost:8000/api/editTruck/${editTruck._id}`, {truckNum,trailerNum,driverName,phoneNum,endorsements,homeLocation,dateReady: realDate, tType, additionalInfo}, {withCredentials: true})
            .then((result)=>{
                console.log(result.data, "truck edited")
                setTrucks(prevTrucks=>{
                    prevTrucks.map((truck,idx)=>{
                        if(truck._id === editTruck._id){
                             truck = result.data
                        }
                    })
                    return prevTrucks
                })
            })
            .catch(error =>{
                console.log(error)
            })
            setEditTruck(null);
    }
    const setChecked=(id)=>{
        console.log(endorsements)
        console.log(id, "checked")
        let endorsement = document.getElementById(id).value;
        console.log(endorsement);


        if ( endorsements && endorsements.includes(endorsement)){
            setEndorsements(()=>{
                let newEndorsements = endorsements.filter((end)=> end !== endorsement)
                return newEndorsements

            })
            console.log(endorsement, "removing checked attribute")
        }
        else{
            if(endorsements){
                setEndorsements([...endorsements, endorsement])
                console.log(endorsement, "adding checked attribute")
            }
            
        }

    }
    const handleRadio=(e)=>{
        if(tType === e.target.value){
            setTType("")
        }
        else{
            setTType(e.target.value)
        }

    }
    const onClose=()=>{
        setEditTruck(null)
    }
    
    if(!editTruck) return null
    return(
        <div>
        <div className={styles.popupForm} style={{zIndex:'12'}}>
        <div className={styles.formHeader}>
            <h1>Edit Driver {!editTruck.driverName ? " ? " : editTruck.driverName}</h1>
            <p onClick={onClose} className={styles.closeBtn}> <HiOutlineXMark style={{ fontSize:'4vh'}}/> </p>

        </div>
        <div className={styles.form} >
            <form onSubmit={submithandler}>
                <div className={styles.formbody1}>
                    <input defaultValue={!editTruck.truckNum ? "truck number" : editTruck.truckNum} onChange={(e)=>setTruckNum(e.target.value)}></input>
                    <input defaultValue={!editTruck.trailerNum ? "trailer number" : editTruck.trailerNum} onChange={(e)=>setTrailerNum(e.target.value)}></input>
                </div>
                <div className={styles.formbody2}>
                    <input defaultValue={!editTruck.driverName ? "name" : editTruck.driverName} onChange={(e)=>setDriverName(e.target.value)}></input>
                    <input defaultValue={!editTruck.phoneNum ? "phone number" : editTruck.phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} ></input>
                </div> 
                <div className={styles.formbody3}>
                <div className={styles.formbody3Left}>
                    <input defaultValue={ !editTruck.homeLocation? "home location" :editTruck.homeLocation} onChange={(e)=>setHomeLocation(e.target.value)}></input>
                </div>
                <div className={styles.formbody4}>
                            <p> Additional Notes</p>
                            <textarea defaultValue={editTruck.additionalInfo} placeholder="additional info" onChange={(e)=>setAdditionalInfo(e.target.value)}></textarea>
                        </div>
                <div className={styles.formbody3Right}>
                <div className={styles.endorsements}>
                    <input onChange={(e)=>setChecked("T")} defaultChecked={endorsements && endorsements.includes("Tanker")} name="endorsements" id="T" value="Tanker" type="checkbox" >
                    </input>

                        <label for="T">Tanker</label>

                    <input onChange={(e)=>setChecked("H")} defaultChecked={ endorsements && endorsements.includes("Hazmat")} name="endorsements" id="H" value="Hazmat" type="checkbox" >
                    </input>
                        <label for="H">Hazmat</label>

                    <input onChange={(e)=>setChecked("DT")} defaultChecked={endorsements && endorsements.includes("DT")} name="endorsements" id="DT" value="DT" type="checkbox" >
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
                        <input placeholder={editDateReady} type="date" id="date" onChange={(e)=> setDateReady(() =>{
                            let d = new Date(e.target.value)
                            d = new Date(d.setDate(d.getDate() + 1))
                            return d
                        })}/>
                </div>
                    </div>
                    </div>
                    <button type="submit" className={styles.buttonSubmit} >Submit</button>         
                </form>
          
                </div>
            </div>
        </div>
    );
}
export default EditTruck
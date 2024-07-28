import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "../styles/EditTruck.module.css";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const EditTruck =({ editTruck, setTrucks, setEditTruck}) =>{

    const [truckNum,setTruckNum] = useState();
    const [trailerNum,setTrailerNum] = useState();
    const [driverName,setDriverName] = useState();
    const [phoneNum,setPhoneNum] = useState();
    const [homeLocation,setHomeLocation] = useState();
    const [dateReady, setDateReady] = useState();
    const [tType, setTType] = useState();
    const [additionalInfo, setAdditionalInfo] = useState();

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
        
        let d = new Date(dateReady);
        let realDate = new Date(d.setDate(d.getDate()))

        axios.put(`http://localhost:8000/api/editTruck/${editTruck._id}`, {
                truckNum,
                trailerNum,
                driverName,
                phoneNum,
                endorsements,
                homeLocation,
                dateReady: dateReady? realDate: editTruck.dateReady,
                tType: tType? tType : editTruck.trailerType,
                additionalInfo
            }, {withCredentials: true})
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
    
    if(!editTruck){
        return null
    }
    else{
        return(
            <div>
            <div className={styles.popupForm} style={{zIndex:'12'}}>
            <div className={styles.formHeader}>
                <div className={styles.formName}> 
                    <h4> Edit Driver </h4> 
                    <h1> {editTruck.driverName}</h1>
                </div>
                <p onClick={onClose} className={styles.closeBtn}> <HiOutlineXMark style={{ fontSize:'4vh'}}/> </p>
            </div>
            <p className={styles.driverInfo}>Driver Information</p>
            <div className={styles.form} >
                <form onSubmit={submithandler}>
                    <div className={styles.formbody1}>
                        <input defaultValue={editTruck.driverName} onChange={(e)=>setDriverName(e.target.value)}></input>
                        <input defaultValue={editTruck.phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} ></input>
                    </div>
                    <div className={styles.formbody2}>
                        <input defaultValue={editTruck.truckNum} onChange={(e)=>setTruckNum(e.target.value)}></input>
                        <input defaultValue={editTruck.trailerNum} onChange={(e)=>setTrailerNum(e.target.value)}></input>
                    </div> 
                    <div className={styles.formbody3}>
                        <input placeholder="home address" defaultValue={editTruck.homeLocation} onChange={(e)=>setHomeLocation(e.target.value)}></input>
                    </div>
                    <div className={styles.dateReady}>
                            <input placeholder={editTruck.dateReady} type="date" id="date" onChange={(e)=> setDateReady(() =>{
                                let d = new Date(e.target.value)
                                d = new Date(d.setDate(d.getDate() + 1))
                                return d
                            })}/>
                    </div>
                    <div className={styles.formbody4}>
                                <p> Additional Notes</p>
                                <textarea defaultValue={editTruck.additionalInfo} placeholder="additional info" onChange={(e)=>setAdditionalInfo(e.target.value)}></textarea>
                            </div>
                    <div className={styles.tType}>
                            <div for="Ttype" className={styles["tType-header"]}>
                                <p>Trailer Type</p>
                            </div>
                            <div className={styles["tType-options"]}> 
                    <label for="R">R</label>
                    <input defaultChecked={editTruck.trailerType === "R"} type="radio" id="R" name="Ttype" value="R" onClick={(e)=> handleRadio(e)}/>
                    <label for="V">V</label>
                    <input defaultChecked={editTruck.trailerType === "V"} type="radio" id="V" name="Ttype" value="V" onClick={(e)=> handleRadio(e)}/>
                    <label for="PO">PO</label>
                    <input defaultChecked={editTruck.trailerType === "PO"} type="radio" id="PO" name="Ttype" value="PO" onClick={(e)=> handleRadio(e)}/>
                    <label for="VT">VT</label>
                    <input defaultChecked={editTruck.trailerType === "VT"} type="radio" id="VT" name="Ttype" value="VT" onClick={(e)=> handleRadio(e)}/>
                    <label for="RT">RT</label>
                    <input defaultChecked={editTruck.trailerType === "RT"} type="radio" id="RT" name="Ttype" value="RT" onClick={(e)=> handleRadio(e)}/>
                    </div>  
                    <div className={styles.endorsements}>
                        <p> Endorsements </p> 
                    <div className={styles.endorsementsFlex}>
                        <input onChange={(e)=>setChecked("T")} defaultChecked={editTruck.endorsements && editTruck.endorsements.includes("Tanker")} name="endorsements" id="T" value="Tanker" type="checkbox" >
                        </input>
    
                            <label for="T">Tanker</label>
    
                        <input onChange={(e)=>setChecked("H")} defaultChecked={ editTruck.endorsements && editTruck.endorsements.includes("Hazmat")} name="endorsements" id="H" value="Hazmat" type="checkbox" >
                        </input>
                            <label for="H">Hazmat</label>
    
                        <input onChange={(e)=>setChecked("DT")} defaultChecked={editTruck.endorsements && editTruck.endorsements.includes("DT")} name="endorsements" id="DT" value="DT" type="checkbox" >
                        </input>
                            <label for="DT">Doubles/Triples</label>

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
}
export default EditTruck
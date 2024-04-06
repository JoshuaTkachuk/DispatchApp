import React, {useState} from 'react';
import NewTruckForm from "./NewTruckForm";

function AddTruckPopup(props) {
    const openForm = props.openForm

    return(
        <div className={openForm == "false"? "" : "overlay"}>
        <div> 

            <button onClick={() => setOpenForm(true)} className="openBtn" >Add Truck</button>
           
            
        </div>
        <div> 
        <NewTruckForm open={openForm} onClose={()=> setOpenForm(false)}/>
        </div>
        </div>
    )
}

export default AddTruckPopup;
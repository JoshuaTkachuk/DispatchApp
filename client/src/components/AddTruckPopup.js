import React, {useState} from 'react';
import NewTruckForm from "./NewTruckForm";

function AddTruckPopup() {
    const [openForm, setOpenForm] = useState(false)

    return(
        <div className="overlay">
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
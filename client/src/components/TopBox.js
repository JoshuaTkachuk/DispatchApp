import React,{useState,useEffect} from "react";
import "../styles/TopBox.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";


const Dnd=()=>{

    return(  
        <div className="top-box">
          <div className="topbox">
            <h2>Truck # </h2>
            
          </div>
        </div>
    );
}
    
export default Dnd;
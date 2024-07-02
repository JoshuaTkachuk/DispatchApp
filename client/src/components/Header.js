import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Draggable, Droppable } from "react-beautiful-dnd";
import { HiOutlineXMark } from "react-icons/hi2";
import styles from "../styles/Header.module.css";




function Header(props){
    const toggleComponents = props.toggleComponents
 const trucks = props.trucks;
 const removeFromBoard = props.removeFromBoard;
 const isDragging = props.isDragging;

    const navigate = useNavigate();

    const logout =(e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout",{}, {withCredentials: true})
        .then((result)=>{
            console.log(result);
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

return(


<div className={styles.mainHeader}> 
    <img src="images/UskoLogo.png"/>
    <h2>Home</h2> 
      <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {trucks.map((truck, index) => (
                  <Draggable
                    draggableId={truck._id}
                    index={index}
                    key={truck._id}
                  >
                    {(provided) => (
                      <div className={styles["top-item-container"]}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className={styles["top-item-header"]}>
                        <button onClick={(e)=> removeFromBoard(truck._id)} className="top-item-button"><HiOutlineXMark style={{ fontSize:'1.3vh'}}/></button>
                        <p className={styles["top-popup"]}>Remove From Board</p>
                        </div>
                        <div className={styles["top-truck-data"]}> 
                          <h3>{truck.driverName}</h3>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
    <div className={styles["mainHeader-right"]}>
    <div className={styles.dropdown}> 
        <button className={styles.settings}>Settings</button>
            <div className={styles.options}> 
                <div className={styles.toggleComponent}> 
                <button  onClick={toggleComponents}>
                    Change View
                </button>
                </div>       
            </div> 
    </div> 
        <button className={styles["mytruck-link"]}>

                    <Link to={"/myTrucks"} style={{textDecoration: 'none', color: 'rgb(237,237,237'}}> Truck List</Link>
        </button>
        <button onClick={logout} className={styles["logout"]} >logout</button>
    </div>

</div>

    );
}

export default Header;
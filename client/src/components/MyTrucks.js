import React,{useState,useEffect} from "react";
import axios, { all } from "axios";
import {Link} from "react-router-dom";
import "../styles/MyTrucks.css";
import NewTruckForm from "./NewTruckForm";
import HeaderMyTrucks from "./HeaderMyTrucks"
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { SlMagnifier } from "react-icons/sl";
import { CiFilter } from "react-icons/ci";






const MyTrucks=()=>{
    
    const [trucks,setTrucks] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [checkVisible, setCheckVisible] = useState("none")
    const [searchVisible, setSearchVisible] = useState("none")
    const [filterVisible, setFilterVisible] = useState("none")


    useEffect(()=>{
        axios.get("http://localhost:8000/api/User", {withCredentials: true})
        .then((result1)=>{
            const email = result1.data.email;
            axios.get(`http://localhost:8000/api/TrucksByUserID/${email}`,{withCredentials: true})
            .then((result)=>{
                console.log(result.data)
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })

        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const addToBoard =(id)=>{
        axios.put("http://localhost:8000/api/addToBoard",{id})
        .then((result)=>{
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    const handleClick = (e) => {
        // Toggle visibility of arrows
        if (checkVisible === "none") {
            setCheckVisible("block");
        } else {
            setCheckVisible("none");
        }
    };

    const searchClick = () => {
        if (searchVisible === "none") {
            setSearchVisible("block");
        } else {
            setSearchVisible("none");
        }
    };

    const filterClick = () => {
        if (filterVisible === "none") {
            setFilterVisible("block");
        } else {
            setFilterVisible("none");
        }
    };

    const searchTrucks = (searchParam)=>{
        console.log(searchParam, "searchParam")
        if(searchParam){
            document.getElementById("Ttype").value = "all";
            document.getElementById("endorsements").value = "all";
            axios.get(`http://localhost:8000/api/SearchTrucks/${searchParam}`, {withCredentials: true})
        .then((result)=>{
            console.log(result.data)
            const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
        })
        .catch(err=>{
            console.log(err)
        })
        }
        if(!searchParam){
            document.getElementById("Ttype").value = "all";
            document.getElementById("endorsements").value = "all";
            axios.get("http://localhost:8000/api/findTrucksById", {withCredentials: true})
            .then((result)=>{
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    const filterTrucks = (e, trailerType, endorsements) =>{
        console.log("filter trucks function being called")
        console.log(trailerType, "trailer type")
        console.log(endorsements, "endorsements")
        axios.get(`http://localhost:8000/api/filterTrucks/${trailerType}/${endorsements}`, {withCredentials: true})
             .then((result)=>{
                const rawTrucks = result.data
                let newTrucks = []
                rawTrucks.forEach((item, idx)=>{
                    const d = new Date(item.dateReady)
                    newTrucks.push({
                        ...item, 
                        dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
                    })
                })
                setTrucks(newTrucks)
            })
            .catch(err=>{
                console.log(err)
            })
        

        // if(type !== "all"){
        //     axios.get(`http://localhost:8000/api/TrucksByTrailerType/${type}`, {withCredentials: true})
        //     .then((result)=>{
        //         const rawTrucks = result.data
        //         let newTrucks = []
        //         rawTrucks.forEach((item, idx)=>{
        //             const d = new Date(item.dateReady)
        //             newTrucks.push({
        //                 ...item, 
        //                 dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
        //             })
        //         })
        //         setTrucks(newTrucks)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // }
        // else(
        //     axios.get("http://localhost:8000/api/findTrucksById", {withCredentials: true})
        //     .then((result)=>{
        //         const rawTrucks = result.data
        //         let newTrucks = []
        //         rawTrucks.forEach((item, idx)=>{
        //             const d = new Date(item.dateReady)
        //             newTrucks.push({
        //                 ...item, 
        //                 dateReady: `${(d.getMonth() + 1).toString().padStart(2, '0') + "/" +  d.getDate() + "/" + d.getFullYear()}`
        //             })
        //         })
        //         setTrucks(newTrucks)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // )
    }


    return(
        <div>
        <HeaderMyTrucks/>
        <div className={openForm === false ? "" : "overlay"}>
        </div>
        <div className="page" >
        <div className="links">  
        <div> 
          <NewTruckForm open={openForm} onClose={()=> setOpenForm(false)} style={{zIndex:'12'}}/>  
        </div> 
        </div>
       <div className="aboveList">
        <div className="aboveList-left"> 
            <div className="listSearch">
                <SlMagnifier size={25}  onClick={() => searchClick ()} className="SlMagnifier" style={{cursor: 'pointer', color: searchVisible === "block" ? "rgb(82, 145, 240)": ""}}/>
                <p onClick={() => searchClick ()} style={{ display: searchVisible === "block" ? "none": "block", cursor: 'pointer'}}>Search</p>
                <input type="search" placeholder="Search" onChange={(e)=>searchTrucks(e.target.value)} style={{ display: searchVisible === "block" ? "block" : "none", marginLeft: '1vw'}}/>
            </div>
            <div className="listFilter-icon"> 
                <CiFilter size={30} onClick={() => filterClick ()} style={{cursor: 'pointer', marginLeft: '2vw', color: filterVisible === "block" ? "rgb(82, 145, 240)": ""}}/>
                <p onClick={() => filterClick ()} style={{ display: filterVisible === "block" ? "none" : "block", cursor:'pointer'}}>Filter</p>
            </div>
            <div className="listFilter" style={{ display: filterVisible === "block" ? "block" : "none"}}> 
                <form onChange={(e)=>filterTrucks(e, document.getElementById("Ttype").value, document.getElementById("endorsements").value)}>
                <label for="Ttype">Trailer Type</label>
                <select defaultValue={"all"} name="Ttype" id="Ttype" >
                    <option value={"all"} >All</option>
                    <option value="V">V</option>
                    <option value="R">R</option>
                </select>
                <label for="Ttype">Endorsements</label>
                <select defaultValue={"all"} name="endorsements" id="endorsements">
                    <option value={"all"} >All</option>
                    <option value="Hazmat" >Hazmat</option>
                    <option value="Tanker" >Tanker</option>
                    <option value="DT" >Doubles/Triples</option>
                </select>
                </form>
        </div>
        </div>
        <div > 
            <button onClick={() => setOpenForm(true)} className="openBtn" style={{}}>Add Truck</button>
        </div>
       </div>
       <div className="list">
       <div className="tableHeader">
       <div onClick={(e) => handleClick (e)} className="selectAllBox">
                                        <MdCheckBoxOutlineBlank style={{ display: checkVisible === "none" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                        <MdCheckBox style={{ display: checkVisible === "block" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
        </div> 
        <div className="columnValues">
        <h3> Name </h3>
        <h3> Truck Number </h3>
        <h3> Trailer Number </h3>
        <h3> Date Ready </h3>
       </div>
       </div>
            {
                trucks.length > 0?
                    trucks.map((itm, idx)=>{
                        return<div key={idx} className="list-items">
                             <div onClick={(e) => handleClick (e)} className="checkBox">
                                        <MdCheckBoxOutlineBlank style={{ display: checkVisible === "none" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                        <MdCheckBox style={{ display: checkVisible === "block" ? "block" : "none", justifyContent: 'start', cursor: 'pointer'}}/>
                                    </div>
                   
                                <div className="truckdata">
                                    <div style={{justifySelf:'start'}}>{itm.driverName}</div>
                                    <div style={{justifySelf:'start'}} >{itm.truckNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.trailerNum}</div>
                                    <div style={{justifySelf:'start'}}>{itm.dateReady}</div>

                                </div>
                         
                        
                            <button onClick={(e)=> addToBoard(itm._id)} className="add-button">Add To Board</button> 
                    
                            

                
                        </div>
                    })
                    :<></>
            }
        </div>
        <div className="footer">
            <p>Load More</p>
        </div>
        
        </div>
        </div>
    
    );
}
export default MyTrucks;
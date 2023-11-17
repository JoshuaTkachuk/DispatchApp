import React,{useState,useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Home.css";
import "../scripts/HomeScripts.js";

const Home=()=>{
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const numRows = daysOfWeek.length;

  return (
    <div className="container">
      <h1>7-Day Calendar</h1>
      <Link to={"/myTrucks"}>My Trucks</Link>

      {/* Calendar with 1 column */}
      <div className="calendar">
        {daysOfWeek.map((day, index) => (
          <div className="calendar-day" key={index}>
            {day}
          </div>
        ))}
      </div>
    </div>
    );
    }
export default Home
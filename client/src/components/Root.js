import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import React from "react";
function Root(){
    return(
        <div>
            <Navbar/>
            
            <Outlet/>
        </div>
    )
}
export default Root;
import React from "react";
import { Link } from "react-router-dom";
import SearchBarFun from "./SearchBar";
import style from "./styles/NavBar.module.css";

function NavBar(){
    
    return (
        <div className={style.mainContainer}>
            
            <SearchBarFun/>
            
            <Link to="/activities" className={style.button}>Agregar actividad</Link>
                      
            
        </div>
        
    )
}

export default NavBar;
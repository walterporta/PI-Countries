import React from 'react'
import { Link } from 'react-router-dom'
import style from "../landing/css/landing.module.css"


export default function LandingPage(){
    return (
        <>
            <video autoPlay muted loop className={style.video}>
                 <source src="https://thumbs.gfycat.com/RedFabulousDutchsmoushond-mobile.mp4" type="video/mp4" />
            </video>

        <div className={style.containerLanding}>
           
            <h2>Countries App</h2>
            <div className={style.centered}>
            <Link to = '/home'> 
                <button> Ingresar !!</button> 
            </Link>
            </div>
        </div>
        </>
    );
}
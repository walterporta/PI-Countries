import React from 'react'
import { Link, } from 'react-router-dom';
import styles from "./CardsCountries.module.css"



function CardsCountries(props){    

    return (
        
            <div className={styles.container} >
        <Link to={`/detail/${props.id}`} >
                <h3>{props.name}</h3>
                
                <img src={props.image} alt={props.name} />
            
                <h4>{props.continente}</h4>
        </Link>
            </div>
    )
   
    
}



export default CardsCountries;

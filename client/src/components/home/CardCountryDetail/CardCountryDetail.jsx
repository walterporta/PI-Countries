// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from "react-router-dom";
// import { getDetail } from '../../../redux/actions';
// import style from "./CardCountryDetail.module.css"

// function CountryDetail(){
//     const country = useSelector(state => state.countryDetail)
//     const dispatch = useDispatch();
    
//     const { id } = useParams();
    
    

// useEffect(() => {
//     dispatch(getDetail(id))
//     },[dispatch, id])
    


//     const activities = country.activities?.map(e => {
//         return {
//             nombre: e.nombre,
//             dificultad: e.dificultad,
//             duracion: e.duracion,
//             temporada: e.temporada
//         }
//     })

   

//     return (
        
//         <div>
//             <div className={style.container}>
//             <Link className={style.button}to="/home" >Regresar al HOME</Link>
//             </div>
            
//             <div className={style.container}>
                 
//             <img src={country.image} />
//             <h1>{country.name} </h1>
//             <p>Código: {country.id} </p>
//             <p>Continente: {country.continente} </p>
//             <p>Capital: {country.capital} </p>
//             <p>Subregión: {country.subregion} </p>
//             <p>Área: {country.area / 1000} Km2 </p>
//             <p>Continente: {country.continente}</p>
//             <p>Población: {country.poblacion} </p>  
            
//             <div className={style.container}>
//                 <h3>Actividades</h3>
//                     {activities?.length > 0 ? activities?.map(e => {
//                         return (
//                             <div key={e.id}>
//                                 <p>Nombre: {e.nombre}</p>
//                                 <p>Dificultadad: {e.dificultad}</p>
//                                 <p>Duration: {e.duracion}</p>
//                                 <p>Temporada: {e.temporada}</p>
//                                 <hr></hr>
//                                 </div>   
//                                 )})
//                     : <p>Sin Actividades</p>}
//             </div>
//             </div>

            
//         </div>     
//     )
        

// }

// export default CountryDetail;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../../redux/actions';
import style from './CardCountryDetail.module.css';

function CountryDetail() {
  const country = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const activitiesSet = new Set();
  const activities = country.activities?.reduce((result, e) => {
    if (!activitiesSet.has(e.nombre)) {
      activitiesSet.add(e.nombre);
      result.push({
        nombre: e.nombre,
        dificultad: e.dificultad,
        duracion: e.duracion,
        temporada: e.temporada,
      });
    }
    return result;
  }, []);

  return (
    <div>
      <div className={style.container}>
        <Link className={style.button} to="/home">
          Regresar al HOME
        </Link>
      </div>

      <div className={style.container}>
        <img src={country.image} />
        <h1>{country.name} </h1>
        <p>Código: {country.id} </p>
        <p>Continente: {country.continente} </p>
        <p>Capital: {country.capital} </p>
        <p>Subregión: {country.subregion} </p>
        <p>Área: {country.area / 1000} Km2 </p>
        <p>Continente: {country.continente}</p>
        <p>Población: {country.poblacion} </p>

        <div className={style.container}>
          <h3>Actividades</h3>
          {activities?.length > 0 ? (
            activities?.map((e) => {
              return (
                <div key={e.nombre}>
                  <p>Nombre: {e.nombre}</p>
                  <p>Dificultadad: {e.dificultad}</p>
                  <p>Duration: {e.duracion}</p>
                  <p>Temporada: {e.temporada}</p>
                  <hr></hr>
                </div>
              );
            })
          ) : (
            <p>Sin Actividades</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;

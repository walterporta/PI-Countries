import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Paginado from "./Paginado";
import NavBar from "./NavBar";
import CardsCountries from './CardsCountries/CardsCountries';

import {getCountries, filterByContinent, filterByOrdenName, filterByOrdenPopulation, getActivity, filterActivity } from '../../redux/actions/index'

import style from "./styles/Home.module.css"


function Home(){
    const dispatch = useDispatch()
    
    const [order, setOrder] = useState('')
    
    const allcountries = useSelector(state => state.countries)
    const allActivities = useSelector(state => state.allActivity)
  
    
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPage, setCountriesPage] = useState(10)

    const indexOfLastCountry = currentPage * countriesPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPage;
    const currentCountry = allcountries.slice(indexOfFirstCountry, indexOfLastCountry);


    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivity())
    }, [dispatch])

   
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
        setCurrentPage(1);
    }

    function paginado(pagenumber){
        setCurrentPage(pagenumber)
    };

    function handleContinent(e){
        const continente = e.target.value
        dispatch(filterByContinent(continente))
        setCurrentPage(1)
    };
    
    function handleOrdenName(e){
        const ordenName = e.target.value
        dispatch(filterByOrdenName(ordenName))
        setOrder(e.target.value)
       
    }

    function handleOrdenPopulation(e){
        const ordenPopulation = e.target.value
        dispatch(filterByOrdenPopulation(ordenPopulation))
        setOrder(e.target.value)
    }


    function handlefilterActivity(e){
        dispatch(filterActivity(e.target.value))
        setOrder(e.target.value)
       
    }    
    
    
    return (
        <div>
            <NavBar/>

            <div className={style.filters}>

                <div className={style.filter}>

                    <div> 
                        <button onClick={e=> {handleClick(e)}}> Recargar Paises </button>  
                        
                    </div>
                
                <div>    
                    <select onChange={handleContinent}>
                        <option disabled defaultValue>
                            Seleccione continente </option>
                        <option value="All">Todos los Continentes</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Europe">Europa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctic">Antarctica</option>
                    </select >
                </div>

                <div>
                    <select onChange={handleOrdenName}>
                        <option disabled defaultValue> Orden Alfabetico </option>
                        <option value="Asc"> A - Z </option>
                        <option value="Desc"> Z - A </option>
                    </select>
                </div>

                <div>
                    <select onChange={handleOrdenPopulation}>
                        <option disabled defaultValue> Orden Poblacion </option>
                        <option value="Max"> Max Poblacion</option>
                        <option value="Min"> Min Poblacion</option>
                    </select>                
                </div>

               
                
                <div>
                <select onChange={(e) => handlefilterActivity(e)}>
                    <option disabled defaultValue> Filtrar por Actividad </option>
                    <option value="All"> Todas </option>
                    {Array.from(new Set(allActivities.map((value) => value.nombre))).map((nombreActividad) => (
                    <option value={nombreActividad}>{nombreActividad}</option>
                    ))}
                </select>
                </div>


                </div>
            </div>
            

           hr
               <Paginado paginado={paginado} allcountries={allcountries.length} countriesPage={countriesPage} currentPage={currentPage} />
           <div className={style.containerCountry}>
           {currentCountry.map((pais)=> {
               return (
                   <div className={style.card}> 
                        <CardsCountries 
                        name={pais.name} 
                        image={pais.image} 
                        continente={pais.continente}
                        capital={pais.capital}
                        subregion={pais.subregion} 
                        area={pais.area}
                        poblacion={pais.poblacion}
                        id={pais.id}
                        />
                        
                    </ div>
                )})}
            </div>
        </div>
        
    )
    
}

export default Home;


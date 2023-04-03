import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getActivity, getCountries, postActivity } from "../../../redux/actions/index"

import style from "./Activity.module.css"

function Activity(){
    const dispatch = useDispatch()
    const history = useHistory()
    
    // ordena los paises 
    const countries = useSelector(state => state.countries).sort((a, b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    })

    const [errors, setErrors] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        pais: '',
    })
    
    const [input, setInput] = useState({
        nombre: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countries: []
    }) 
    
   
    function valida(input) {
        let errors = {};
        if (!input.nombre) {
          errors.name = "Name required";
        }
        return errors;
      }

      
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    useEffect(() => {
        dispatch(getActivity())
    }, [dispatch])

       
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(valida({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(id) {
        setInput({
            ...input,
            countries: [...input.countries, id.target.value]
        })
    }

    function handleSeason(e) {
        setInput({
            ...input,
            temporada: e.target.value
        })
    }

    function handleSelctDifficulty(e) {
        setInput({
            ...input,
            dificultad: e.target.value
        })
    }

    function handleSelectDuration(e) {
        setInput({
            ...input,
            duracion: e.target.value
        })
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     dispatch(postActivity(input))

    //     setInput({
    //         nombre: '',
    //         dificultad: '',
    //         duracion: '',
    //         temporada: '',
    //         countries: []
    //     })
    //     history.push('/home')
        
    //     window.alert('¡La actividad ha sido creada exitosamente!');

       
    // }
    function handleSubmit(e) {
        e.preventDefault();
        
        // Normalizar el nombre de la actividad a minúsculas
        const nombreNormalizado = input.nombre.toLowerCase();
        
        // Crear un objeto con los datos normalizados
        const actividad = {
          nombre: nombreNormalizado,
          dificultad: input.dificultad,
          duracion: input.duracion,
          temporada: input.temporada,
          countries: input.countries
        };
        
        // Enviar la actividad normalizada al servidor
        dispatch(postActivity(actividad));
      
        setInput({
          nombre: '',
          dificultad: '',
          duracion: '',
          temporada: '',
          countries: []
        })
        
        history.push('/home')
        
        window.alert('¡La actividad ha sido creada exitosamente!');
      }
      



    const temporada = ['Invierno', 'Primavera', 'Otoño', 'Verano'];
    const dificultad = ['1', '2', '3', '4', '5'];
    const duracion = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];


    return (
        <div>
            <Link className={style.button}to="/home" >Regresar al HOME</Link>
        <div className={style.filterActive}>
       
        <form onSubmit={handleSubmit}>
            <div>
                <label>Actividad: </label>
                <input type="text" value={input.nombre} name="nombre" onChange={handleChange} placeholder="Nombre..." required/>
                {errors.name && (
                <p >{errors.name}</p>
                )}
            </div>

            <hr />

            <div>
                <label>Temporada: </label>
                <select onChange={handleSeason} required>
               <option value="" hidden>Elija una opción</option>
               {temporada.map(e => (
                <option value={e} name="temporada" key={e} >{e}</option>
                ))}
               </select>
            </div>

            <hr />

            <div>
                <label>Dificultad: </label>
                <select onChange={handleSelctDifficulty} required>
                <option value="" hidden>Elija una opción</option>
                {dificultad.map(e => (
                <option value={e} name="dificultad">{e}</option>
                
                ))}
                </select>
            </div>

            <hr />

            <div>
                <label>Duracion: </label>
                <select onChange={handleSelectDuration} required>
                <option value="" hidden>Elija una opción</option>
                {duracion.map(e => (
                <option value={e} name="duracion">{e}</option>
                
                ))}
                </select>
            </div>

            <hr />

            <div>
                <label>Pais: </label>
                <select onChange={handleSelect} required>
                <option value="" hidden>Seleccione un Pais o varios.</option>
                {countries.map(e => (
                <option value={e.id} name="countries" key={e.id} >{e.name}</option>
                ))}
                </select>
            </div>

            <hr />


            <div>
                <ul>
                    <li>{input.countries.map(i =>
                        <div key={i}>
                            {i}
                                <button onClick={() => handleDelete(i)} type="button">X</button>
                                    </div>)}</li>
                </ul>
            </div>
                                 <button type="submit">Agregar Actividad</button>
       
      </form>      
              
           </div>
    </div>
)
}



export default Activity;
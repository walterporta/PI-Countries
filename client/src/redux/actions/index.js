import axios from 'axios';
import {
   GET_ACTIVITY,
   GET_COUNTRIES,
   GET_DETAIL,
   BY_CONTINENT,
   BY_ACTIVITY,
   BY_NAME,
   BY_ODER,
   BY_POPULATION,       
   FAILURE,
   CLEAR_DETAIL,
   FILTER_BY_ACTIVITIES
} from './constantes'

const url = 'http://localhost:3001';


// Traer todos los countries
export function getCountries(){
    return async function(dispatch) { 
        try{
            const res = await axios.get(`${url}/countries`);
            return dispatch({
                type: GET_COUNTRIES,
                payload: res.data
            })
        } catch(e){ 
            return dispatch({
                type: FAILURE,
                payload: e.response.data.msg  
        }
        )}
    }
}



// traer countri por ID
export function getDetail(id) {
    return async function (dispatch) {
        try {
            console.log(id)
            const res = await axios.get(`${url}/countries/${id}`)
            
            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}




// Publicar activodad 
export function postActivity(payload) {
    return async function (dispatch) {
        try {
            await axios.post(`${url}/activities`, payload)
            
            return dispatch ({
                type: BY_ACTIVITY,
                
            })
        } catch (error) {
            console.log(error)
        }
    }
}


//ordenar por continente
export function filterByContinent(continent){
    return {
        type: BY_CONTINENT,
        payload: continent
    }
};


//ordenar por nombre
export function filterByOrdenName(contry){
    return {
        type: BY_ODER,
        payload: contry
    }
}


//ordenar por poblacion 
export function filterByOrdenPopulation(population){
    return {
        type: BY_POPULATION,
        payload: population
    }
}


//SearchBar
export  function getByName(name){
    return async function(dispatch){
        try {
            const nombre = await axios.get(`${url}/countries?name=${name}`);
            return dispatch({
                type: BY_NAME,
                payload: nombre.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


//limpia el detalle del pais seleccioado
export function clearDetail(){
    return{
        type: CLEAR_DETAIL
    }
}


//Trer actvidad
export function getActivity() {
    return async function (dispatch) {
               try {
            const res = await axios.get(`${url}/activities`);
            return dispatch({
                type: GET_ACTIVITY,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



//filtrar actividad
export function filterActivity(payload){
    return {
        type: FILTER_BY_ACTIVITIES,
        payload,
    }
}











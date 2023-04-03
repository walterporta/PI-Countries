import {
    GET_ACTIVITY,
    GET_COUNTRIES,
    GET_DETAIL,
    BY_CONTINENT,
    BY_NAME,
    BY_ODER,
    BY_POPULATION,
    CLEAR_DETAIL,    
    FILTER_BY_ACTIVITIES
} from '../actions/constantes'


export const initialState = {
    countries: [],
    allContry: [],
    poblacion: [],
    countryDetail: {},
    allActivity: [],  
}


function reducer(state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES: // obtiene la lista completa de paises
            return {
                ...state,
                countries: action.payload,
                allContry: action.payload,
            }

        case BY_CONTINENT: // filtra los paises por continente
            const allContry = state.allContry;
            const contryFilter = action.payload === 'All' ? allContry : allContry.filter((pais)=> pais.continente === action.payload)
            
            return {
                ...state,
                countries: contryFilter
            }

        case BY_ODER:  // ordena los paises alfabeticamente
            const ordenNameCountries = action.payload === 'Asc' ? state.countries.sort(function (a, b) {
                if (a.name > b.name) { return 1}
                if (b.name > a.name) { return -1}
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if (a.name > b.name) {return -1}
                if (b.name > a.name) {return 1}
                return 0;
            })
            return {
                ...state,
                countries: ordenNameCountries
            }

        
        case BY_POPULATION: // ordena los paises por ponblacion
            const ordenarByPopulation = action.payload === 'Min' ?
            state.countries.sort(function (a, b) {
                if (Number(a.poblacion) > Number(b.poblacion)) {return 1}
                if (Number(b.poblacion) > Number(a.poblacion)) {return -1}
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if (Number(a.poblacion) > Number(b.poblacion)) {return -1}
                if (Number(b.poblacion) > Number(a.poblacion)) {return 1}
                return 0;
            })
            return {
                ...state,
                poblacion: ordenarByPopulation
            }
            

        case BY_NAME:  // filtra los paises por nombre
            return{
                ...state,
                countries: action.payload
            }

        case GET_DETAIL: // obtiene los detalle de cada pais
            {
            state.countryDetail = {};
            return {
                ...state,
                countryDetail: action.payload
            }
            }
            
        case CLEAR_DETAIL:{  // limpia el detalle de un pais especifico
            return {
                ...state,
                    countryDetail: {}
            }
        }

       case GET_ACTIVITY:{  // obtiene todas las actividades creadas
            return {
                ...state,
                allActivity: action.payload
            }
       } 
              
       case FILTER_BY_ACTIVITIES:  // filtra los paises por actividad 
        const filterActivity = state.allContry
        const filteredAct = filterActivity.filter((c) => { return c.activities.find((c) => { return c.nombre === action.payload; }); });

        if (action.payload === 'All') {
            return {
            ...state, 
            countries: filterActivity
            }
        } else {
            return {
            ...state,
            countries: filteredAct
            }
        }
     
        default: return state;
    }
};

export default reducer; 


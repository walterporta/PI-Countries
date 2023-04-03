import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/index"
import style from "./styles/SearchBar.module.css"


 export default function SearchBarFun(){

    const [inputCountry, setInputCountry] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(inputCountry.trimStart().trimEnd()))
        setInputCountry('')
      }

    return (
        <div className={style.searchBar}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Ingresa tu busqueda' value={inputCountry} onChange={(e)=>setInputCountry(e.target.value)} ></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
};




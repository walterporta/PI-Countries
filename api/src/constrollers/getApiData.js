const axios = require("axios");
const URL = "https://restcountries.com/v3/all";



const getApidata = async () =>{
   
    try{
        const countries = await axios.get(URL);
        let allCountries  = countries.data.map((country) =>{
        let Capital;
            if(Array.isArray(country.capital)) Capital = country.capital.pop()
            
            
            return {
                id: country.cca3,
                name: country.name.common,
                image: country.flags.svgFile || country.flags[1],
                continente: country.region ? country.region : "Not Found",
                capital: Capital ? Capital : "Not Found",
                subregion: country.subregion ? country.subregion : "Not Found",
                area: country.area,
                poblacion: country.population
                
            };
        })
            
        return allCountries
    }catch (error) {
        return {error: error.message};

    }
}

module.exports = { getApidata };


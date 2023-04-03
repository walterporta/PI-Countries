const { Country } = require ("../db")
const { getApidata } = require("./getApiData");

const saveApiData = async () => {
    try {
        const countries = await getApidata();
        await Country.bulkCreate(countries);
        return countries
    

    } catch (error) {
        return {error: error.message};
    }
}

module.exports = {saveApiData};
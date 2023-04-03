const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query
    
    const allCountries = await Country.findAll({
        include: Activity
    })

    if (name) {
        const countriName = await allCountries.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
        countriName.length ?
            res.status(200).send(countriName) :
            res.status(404).send({ 'msg': 'Country Not found' })
    } else {
        res.status(200).send(allCountries)
    }
});




 
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    countries = await Country.findByPk(id, { include: Activity })

    try {
        if (id.length > 1) {
            

            countries = {
                id: countries.id,
                name: countries.name,
                image: countries.image,
                continente: countries.continente,
                capital: countries.capital,
                subregion: countries.subregion,
                area: countries.area,
                poblacion: countries.poblacion,
                activities: countries.activities.map((act) => {
                    return {
                        id: act.id,
                        nombre: act.nombre,
                        dificultad: act.dificultad,
                        duracion: act.duracion,
                        temporada: act.temporada
                    }
                })
            }
        }
        res.json(countries)
    } catch (error) {
        next(error)
    }
});

module.exports = router;
const { Router } = require('express');
const { Activity, Country } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const allActivities = await Activity.findAll({ include: Country })
    
    

   
    const filterActivities = allActivities.map(e => {
       return {nombre:e.dataValues.nombre, id:e.dataValues.id}})
            
    
    res.json(filterActivities)
});





router.post('/', async (req, res, next) => {
    const {
        nombre,
        dificultad,
        duracion,
        temporada,
        countries
        } = req.body;

    try {
        let activity = await Activity.create({ nombre, dificultad, duracion, temporada })
        await activity.setCountries(countries)

        let activityWithCountry = await Activity.findOne({
            where: { nombre: nombre },
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
            include: {
                model: Country,
                through: {
                    attributes: []
                }
            }
        })
        res.json(activityWithCountry)
    } catch (error) {
        next(error)
    }

});

module.exports = router;
const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if (name.length < 2) {
                const message = "Merci d'entrer un minimun de 2 caractères pour la recherche du nom."
                return res.status(400).json({ message })
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: { //name est la propriété du modèle pokemon
                        [Op.like]: `%${name}%` //name est le critère de la recherche 
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({ count, rows }) => {
                    const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                    res.json({ message, data: rows })
                })

        } else {
            Pokemon.findAll()
                .then(pokemons => {
                    const message = 'La liste des pokémons a bien été récupérée.'
                    res.json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
                    res.status(500).json({ message, data: error })
                })
        }
    })
}
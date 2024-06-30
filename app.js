const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

// on crée une instance d'une application express - petit serveur web sur lequel va fonctionner notre api rest
const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());
//NB : next sera appelé directement par les middlewares favicon et morgan

sequelize.initDb()

// Ici, nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

//On ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée. Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));
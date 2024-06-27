const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper'); //on n'importe que la méthode success du helper
const pokemons = require('./mock-pokemon');

// on crée une instance d'une application express - petit serveur web sur lequel va fonctionner notre api rest
const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());
//NB : next sera appelé directement par les middlewares favicon et morgan

app.get('/', (req, res) => res.send("Salutation, Humain 👽"));

app.get('/api/pokemons', (req, res) => {
    // res.send(`Il y a ${pokemons.length} pokémons dans le Pokedex pour le moment.`)
    const message = 'La liste des pokémons a bien été récupérée.';
    res.json(success(message, pokemons));
})

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = 'Un pokémon a bien été trouvé';
    // res.send(`Vous avez demandé le pokemon ${pokemon.name}`)
    res.json(success(message, pokemon));

});

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));
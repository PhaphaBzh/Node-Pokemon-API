//Sans le raccourci de syntaxe
// const success = (message, data) => {
//     return {
//         message: message,
//         data: data
//     }
// }
// exports.success

const pokemons = require("./mock-pokemon")

//Avec le raccourci de syntaxe ECMAScript 6
exports.success = (message, data) => {
    return { message, data }
}

//pour générer un id unique
exports.getUniqueId = (pokemons) => {
    const pokemonsId = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsId.reduce((a, b) => Math.max(a, b))
    const uniqueId = maxId + 1
    return uniqueId
}
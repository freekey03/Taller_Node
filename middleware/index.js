module.exports = (req, res, next) =>{
    //const pokemon = pokedex.pokemon; se borra porque se puso {pokemon}
    return res.status(200).json({code:1, message:'Bienvenido'});
}
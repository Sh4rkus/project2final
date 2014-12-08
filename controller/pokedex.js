var express = require('express');
var router  = express.Router();
var db   = require('../models/db');

router.get('/', function(req, res) {
    db.getPokemon(function(err, result){
        if(err) throw err;
        res.render('pokedex.ejs', {rs: result});
    });
});

router.post('/result', function(req, res){
    console.log(req.body.pokemonName);

    db.createPokemonView(req.body.pokemonName, function(err, result){
        if(err) throw err;
    })
    db.getPokemonDetails(req.body.pokemonName, function(err, result){
        if(err) throw err;
        res.render('pokemonDetails.ejs', {rs: result});
    });
});

module.exports = router;
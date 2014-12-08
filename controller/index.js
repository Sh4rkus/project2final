var express = require('express');
var router = express.Router();
var db   = require('../models/db');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// Return the text Hello, World!.
router.get('/about', function(req, res){
    res.render('about.ejs');
});

router.get('/createAccount', function(req, res){
    res.render('createAccount.ejs');
});

router.post('/creationSuccess', function(req, res){
   db.Insert(req.body, function(err, result) {
       if(err) throw err;

       if(result.UserID != 'undefined') {
           var placeHolderValues = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
           };
           res.render('creationSuccess.ejs', placeHolderValues)
       }
       else{
           res.send('Unable to create account.');
       }
   });
});

router.get('/typeCompare', function(req, res) {
    db.getTypes(function(err, result){
        if(err) throw err;
        res.render('typeCompare.ejs', {rs: result});
    });
});

router.post('/typeComparison/result', function(req, res){
   res.send('Type checked!');
});

router.get('/moveList', function(req, res) {
    db.getMoves(function(err, result){
        if(err) throw err;
        res.render('moves.ejs', {rs: result});
    });
});

router.get('/abilities', function(req, res) {
    db.getAbilities(function(err, result){
        if(err) throw err;
        res.render('abilities.ejs', {rs: result});
    });
});

router.get('/natures', function(req, res) {
    db.getNatures(function(err, result){
        if(err) throw err;
        res.render('natures.ejs', {rs: result});
    });
});

router.get('/insertionTool', function(req, res) {
        res.render('insertTool.ejs');
});

router.post('/insertSuccess', function(req, res){


    db.InsertTool(req.body, function(err, result) {
        if(err) throw err;

        if(result.PokedexNumber != 'undefined') {
            var placeHolderValues = {
                pNum: req.body.pNum,
                name: req.body.name,
                entry: req.body.entry,
                ability: req.body.ability,
                hability: req.body.hability,
                growthrate: req.body.growthrate,
                typename: req.body.typename
            };
            res.render('insertSuccess.ejs', placeHolderValues)
        }
        else{
            res.send('Unable to insert Pokemon.');
        }
    });

    db.InsertType(req.body, function(err, result){
        if(err) throw err;
    });

});



/* index file that links to various examples */
router.get('/', function(req, res){
    // use render instead of send, to replace the placeholders in index.ejs with the Key Value Pairs (KVP).
    res.render('index');
});


module.exports = router;


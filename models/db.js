var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'mmckinney',
    password: '004137931'
    //user: 'your_username',
    //password: 'your_password'
});

var dbToUse = 'mmckinney';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

//create the Account table if it does not exist
connection.query(useDatabaseQry, function (err) {
    if (err) throw err;

    var createTableQry = 'CREATE TABLE IF NOT EXISTS Account('
        + 'AccountID INT AUTO_INCREMENT PRIMARY KEY'
        + ',Username VARCHAR(50) UNIQUE'
        + ',Email VARCHAR(255) UNIQUE'
        + ',Password VARCHAR(50)'
        + ')';
    connection.query(createTableQry, function (err) {
        if (err) throw err;
    });
});

exports.Insert = function(userInfo, callback) {
    connection.query( 'INSERT INTO User (Email, Username, Password) VALUES (\'' + userInfo.email + '\', \'' + userInfo.username + '\', \'' + userInfo.password + '\');',
        function(err, result) {
            if(err){
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );

}

exports.InsertTool = function(userInfo, callback) {
    connection.query( 'INSERT INTO Pokemon (PokedexNumber, Name, Entry, Ability, HiddenAbility, GrowthRate) VALUES (\'' + userInfo.pNum + '\', \'' + userInfo.name + '\', \'' + userInfo.entry + '\', \'' + userInfo.ability + '\', \'' + userInfo.hability + '\', \'' + userInfo.growthrate + '\');',
        function(err, result) {
            if(err){
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );

}

exports.InsertType = function(type, callback){
    console.log('Successfully inserted Type ' + type.typename);
    connection.query('INSERT INTO Types VALUES (\'' + type.typename + '\', \'' + type.pNum + '\');',
        function(err, result){
            if(err){
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        });
}

exports.getTypes = function(callback) {
    connection.query('SELECT DISTINCT TypeName FROM Types',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.getMoves = function(callback) {
    connection.query('SELECT * FROM Moves',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.getNatures = function(callback) {
    connection.query('SELECT * FROM Nature',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.getAbilities = function(callback) {
    connection.query('SELECT * FROM Abilities',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.getPokemon = function(callback) {
    connection.query('SELECT Name, PokedexNumber FROM Pokemon',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.createPokemonView = function(Name, callback) {
    connection.query('CREATE OR REPLACE VIEW PokeDetails AS SELECT p.*, b.*, c.* ' +
        '             FROM Pokemon as p ' +
        '             JOIN BaseStats as b' +
        '             ON p.PokedexNumber = b.PokeNum ' +
        '             JOIN CanLearn as c' +
        '             ON p.PokedexNumber = c.PokemonNumber ' +
        '             WHERE p.PokedexNumber = ' + Name,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}

exports.getPokemonDetails = function(Name, callback) {
    connection.query('SELECT * FROM PokeDetails',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        });
}









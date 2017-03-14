//var express = require('express');
//var gameData = require('../svc/gameData.js')
//var router = express.Router();

function init(gameData) {
    var express = require('express');
    var router = express.Router();

var randomWords = ['bubble','university','joust','vehicular','gregarious','quiddity','sincere','umbrella'];
        /* GET game state listing. */
    router.get('/', function(req, res, next) {
    //res.send('game state ' + JSON.stringify(gameData));
    res.send(gameData);
    });

    /* PUT to initialize game  */
    router.put('/', function(req, res, next) {
        var word = '';
        if (req.body.targetWord){
            word = req.body.targetWord;
        }else{
            word = randomWords[ Math.floor(Math.random() * randomWords.length) ];    
        }
            gameData.targetWord = word;
            gameData.maskedWord = Array(word.length + 1).join("-");
            gameData.incorrectLetters = [];
            gameData.correctLetters = [];
            gameData.hangManScore = 0;
            gameData.isGameOver = false;
            gameData.isGameWon = false;
            res.send(gameData);
    });
    return router;
}


module.exports = init;

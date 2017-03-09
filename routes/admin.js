//var express = require('express');
//var gameData = require('../svc/gameData.js')
//var router = express.Router();

function init(gameData) {
    var express = require('express');
    var router = express.Router();
    
        /* GET game state listing. */
    router.get('/', function(req, res, next) {
    //res.send('game state ' + JSON.stringify(gameData));
    res.send(gameData);
    });

    /* PUT to initialize game  */
    router.put('/', function(req, res, next) {
        if (req.body.targetWord){
            gameData.targetWord = req.body.targetWord;
            gameData.incorrectLetters = [];
            gameData.correctLetters = [];
            gameData.hangManScore = 0;
            gameData.isGameOver = false;
            gameData.isGameWon = false;
            res.send(gameData);
        }else{
            res.status(400).send("need target word")
        }
        
    });
    return router;
}


module.exports = init;

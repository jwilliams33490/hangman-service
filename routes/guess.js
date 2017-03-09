function init(gameData){
    var express = require('express');
    //var gameData = require('../svc/gameData.js')
    var router = express.Router();


    router.post('/', function(req, res, next) {
    var character = req.body.guess;
    console.log(JSON.stringify(req.body))
    if (!character || character.length >1){
        res.status(400).send("invalid guess " + character)
    }
    
    var alreadyGuessed = isLetterAlreadyGuessed(character)
    if (alreadyGuessed){
        //res.send(character + " was already guessed " + JSON.stringify(gameData))
        res.status(400).send(character + " was already guessed ")
    } else{
        var success = isLetterInWord(character)
        isGameOver()  
        //res.send('game state ' + success + ' ' + JSON.stringify(character) + '' + JSON.stringify(gameData));
        res.send(gameData);
    }
    
    });

    function isLetterAlreadyGuessed(character){
        var alreadyGuessed = gameData.correctLetters.includes(character) || gameData.incorrectLetters.includes(character);
        return alreadyGuessed;    
}


    function isLetterInWord(character){
        var n = gameData.targetWord.indexOf(character)
        if (n >= 0){
            gameData.correctLetters.push(character)
            return true
        } else {
            gameData.incorrectLetters.push(character)
            gameData.hangManScore = gameData.hangManScore + 1
            return false
        }
    }

    function isGameOver(){
        if (gameData.hangManScore >= 10){
            gameData.isGameOver = true
            gameData.isGameWon = false
            return
        }
        for (var i = 0, len = gameData.targetWord.length; i < len; i++) {
            //console.log(gameData.targetWord[i]);
            if (gameData.correctLetters.includes(gameData.targetWord[i])){
                if (i == len-1){
                    gameData.isGameOver = true
                    gameData.isGameWon = true
                    return
                }                
            }else{
                gameData.isGameOver = false
                return
            }
        }
        
    }
    return router; 
}

module.exports = init;
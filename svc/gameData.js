var gameData = new Object();
gameData.targetWord = 'jessica';
gameData.maskedWord = Array(gameData.targetWord.length + 1).join("-");
gameData.incorrectLetters = [];
gameData.correctLetters = [];
gameData.hangManScore = 0;
gameData.isGameOver = false;
gameData.isGameWon = false;

module.exports = gameData;
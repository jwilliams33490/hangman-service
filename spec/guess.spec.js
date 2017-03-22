var frisby = require('frisby');

frisby.create('Put Game State')
  .put('http://localhost:3000/admin',{
      targetWord:'cat'
  },{json:true})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "targetWord": "cat",
    "maskedWord": "---",
    "incorrectLetters": [],
    "correctLetters": [],
    "hangManScore": 0,
    "isGameOver": false,
    "isGameWon": false
  })
  .after(function(err, res, body) {
    frisby.create('Second test, run after first is completed')
      .post('http://localhost:3000/guess',{"guess":"c"},{json:true})
      .expectJSON({
        "targetWord": "cat",
        "maskedWord": "c--",
        "incorrectLetters": [],
        "correctLetters": ['c'],
        "hangManScore": 0,
        "isGameOver": false,
        "isGameWon": false
        })
        .after(function(err, res, body) {
            frisby.create('Second test, run after first is completed')
            .post('http://localhost:3000/guess',{"guess":"m"},{json:true})
            .expectJSON({
                "targetWord": "cat",
                "maskedWord": "c--",
                "incorrectLetters": ['m'],
                "correctLetters": ['c'],
                "hangManScore": 1,
                "isGameOver": false,
                "isGameWon": false
                })
            .after(function(err, res, body) {
                frisby.create('Second test, run after first is completed')
                .post('http://localhost:3000/guess',{"guess":"a"},{json:true})
                .expectJSON({
                    "targetWord": "cat",
                    "maskedWord": "ca-",
                    "incorrectLetters": ['m'],
                    "correctLetters": ['c','a'],
                    "hangManScore": 1,
                    "isGameOver": false,
                    "isGameWon": false
                    })
                .after(function(err, res, body) {
                    frisby.create('Second test, run after first is completed')
                    .post('http://localhost:3000/guess',{"guess":"t"},{json:true})
                    .expectJSON({
                        "targetWord": "cat",
                        "maskedWord": "cat",
                        "incorrectLetters": ['m'],
                        "correctLetters": ['c','a','t'],
                        "hangManScore": 1,
                        "isGameOver": true,
                        "isGameWon": true
                        })
                    .toss()
                })
                .toss()
            })
            .toss()
        })
    .toss()
  })
.toss()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const url = `http://localhost:${PORT}`;

const wordList = require('./wordlist');
const secretList = require('./secretList');
const secretWord = require('./generateWord');
const commonLetter = require('./compareLetter');
const guessWord = require('./guessWord');


app.use(express.static('public'));
app.use(bodyParser.json({extended :true, type :'*/*'}));
// app.options('*', (res, req, next)=>{
//     next();
// });

app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTION,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
        next();
    }
    //next();
});


//generate secret word and send id + answer to client
//url = '/game'
app.post(`${url}/game/`,(req,res) => {
   const answer = secretWord(wordList);
    console.log(answer);
    secretList.updateList('a',answer);
   let id = 'a'+secretList.getIndex('a',answer);
   console.log(`answer is ${answer}`);
    res.send(JSON.stringify({
       id : id,
       secret : answer
   }));
});

//guess a word and send guess word to client
app.put(`${url}/game/:id/guessed`,(req,res) => {
    //matched is from client
    const matched = req.body.matches;
    const guessed = req.body.guessed;
    res.send(JSON.stringify({
        newGuess : guessWord('a',guessed,matched,wordList)
    }));
});

//compare letter and send matched letter and haswon
app.get(`${url}/game/:id/guess/:guess`,(req,res) => {
    const id = req.params.id;
    const guess = req.params.guess;
    const secList = secretList.getList(id.charAt(1));
    const secret = secList[secList.length-1];
    let hasWon = false;
    if (guess === secret){
        hasWon = true;
    }
    let matched = commonLetter(guess,secret);
    res.send(JSON.stringify({
        matched : matched,
        hasWon:hasWon
    }));
});



app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});
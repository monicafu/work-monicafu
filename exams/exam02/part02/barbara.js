const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8888;

const wordList = require('./wordlist');
const secretList = require('./secretList');
const secretWord = require('./generateWord');
const commonLetter = require('./compareLetter');
const guessWord = require('./guessWord');


app.use(express.static('public'));
app.use(bodyParser.json({extended :true, type :'*/*'}));

app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'OPTION,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




//generate secret word and send id + answer to client
//url = '/game'
app.post('/game',(req,res) => {
    const answer = secretWord(wordList);
    secretList.updateList('b',answer);
    const id = 'b'+ secretList.getIndex('b',answer);
    console.log(`answer is ${answer}`);
    res.send(JSON.stringify({
        id : id,
        answer : answer
    }));
});

//guess a word and send guess word to client
app.put('/game/:id/guessed',(req,res) => {
    const id = req.params.id;
    const guessed = req.body.guessed;
    const matched = req.body.matched;
    res.send(JSON.stringify({
        newGuess : guessWord(id,guessed,matched,wordList)
    }));
});

//compare letter and send matched letter and haswon
app.get('/game/:id/guess/:guess',(req,res) => {
    const id = req.params.id;
    const guess = req.params.guess;
    const secList = secretList.getList(id.charAt(0));
    const secret = secList[secList.length-1];
    let hasWon = false;
    const matched = commonLetter(guess,secret);
    if (guess === secret){
        hasWon = true;
    }
    res.send(JSON.stringify({
        matched,
        hasWon
    }));
});

app.delete('/game/:id',(req,res) => {
    let id = req.params.id;
    secretList.emptyList(id.charAt(0));
    res.send(JSON.stringify({
        isDeleted: true
    }));
});


app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});
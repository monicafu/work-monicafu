const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

const wordList = require('./wordlist');
const secretWord = require('./generateWord');
const commonLetter = require('./compareLetter');
const guessWord = require('./guessWord');
let users = {};
let startId = 0;

app.use(express.static('public'));
app.use(bodyParser.json({extended :true, type :'*/*'}));


app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTION,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    next();
});


//generate secret word and send id + answer to client
app.post('/game',(req,res) => {
    const id = 'a'+ startId;
    users[id] = {};
    users[id].userId = id;
    users[id].wordList =[...wordList];
    const answer = secretWord(users[id].wordList);
    console.log(`user : ${id} , ${answer}`);
    users[id].secret = answer;
    users[id].createDate = new Date().getTime();
    startId++;
    console.log('secret: '+users[id].secret);
    res.status(200).send(JSON.stringify({
       id,
       answer
   }));
});

//guess a word and send guess word to client
app.put('/game/:id/guessed',(req,res) => {
    const id = req.params.id;
    const guessed = req.body.guessed;
    const matched = req.body.matched;
    if (id.charAt(0)=== 'a'){
        res.status(200).send(JSON.stringify({
            newGuess : guessWord(users[id].wordList,guessed,matched)
        }));
    }else{
        res.status(400).send( {msg: "user-id-invalid" } );
    }
});

//compare letter and send matched letter and haswon
app.get('/game/:id/guess/:guess',(req,res) => {
    const id = req.params.id;
    const guess = req.params.guess;
    const secret = users[id].secret;
    let hasWon = false;
    const matched = commonLetter(guess,secret);
    users[id].modifyDate = new Date().getTime();
    if (id.charAt(0) === 'a' && guess !== null){
        if (guess === secret){
            hasWon = true;
        }
        res.status(200).send(JSON.stringify({
            matched,
            hasWon
        }));
    }else{
        res.status(400).send( {msg: "user-id-guess-invalid" } );
    }
});
app.delete('/game/:id',(req,res) => {
    const id = req.params.id;
    delete users[id];
    if (id.charAt(0) === 'a'){
        res.status(200).send(JSON.stringify({
            isDeleted: true
        }));
    }else{
        res.status(400).send( {msg: "user-id-invalid" } );
    }
});


app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});
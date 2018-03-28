const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8888;

const wordList = require('./wordlist');
const secretList = require('./secretList');
const secretWord = require('./generateWord');
const commonLetter = require('./compareLetter');
const guessWord = require('./guessWord');
const date = require('./date');


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
    date.serverB.id = id;
    date.serverB.createDate = new Date().getTime();
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
    if (id.charAt(0)=== 'b'){
        res.status(200).send(JSON.stringify({
            newGuess : guessWord(id,guessed,matched,wordList)
        }));
    }else{
        res.status(400).send( {"msg": "user-id-invalid" } );
    }
});

//compare letter and send matched letter and haswon
app.get('/game/:id/guess/:guess',(req,res) => {
    const id = req.params.id;
    const guess = req.params.guess;
    const secList = secretList.getList(id.charAt(0));
    const secret = secList[secList.length-1];
    let hasWon = false;
    const matched = commonLetter(guess,secret);
    if (id.charAt(0) === 'b' && guess !== null){
        if (guess === secret){
            hasWon = true;
        }
        res.status(200).send(JSON.stringify({
            matched,
            hasWon
        }));
    }else{
        res.status(400).send( {"msg": "user-id-guess-invalid" } );
    }
});

app.delete('/game/:id',(req,res) => {
    let id = req.params.id;
    secretList.emptyList(id.charAt(0));
    date.serverB.modifyDate = new Date().getTime();
    if (id.charAt(0) === 'b'){
        res.status(200).send(JSON.stringify({
            isDeleted: true
        }));
    }else{
        res.status(400).send( {"msg": "user-id-invalid" } );
    }
});


app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});
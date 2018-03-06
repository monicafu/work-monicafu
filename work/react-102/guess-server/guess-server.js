const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

const secretList = require('./secretList');
const secretWord = require('./generateWord');
const wordList = require('./wordlist');
const commonLetter = require('./compareLetter');

app.use(express.static('public'));
app.use(bodyParser.json({extended :true, type :'*/*'}));

//web service : generate a secret word, push into list then return id
app.get('/getId', (req, res ) =>  {
    const answer = secretWord(wordList);
    secretList.update(answer);
    const id = secretList.idx(answer);
    console.log(`answer: ${answer}, id: ${id}`);
    res.send( JSON.stringify(id));
});

//get the full wordlist
app.get('/getWordList', (req, res) =>  {
    res.send( JSON.stringify(wordList));
});

//compare guess with the secret word and return the common letter
app.post('/getResult', (req, res ) =>  {
    const guess = req.body.guess;
    const id = req.body.id;
    const common = commonLetter(guess,secretList.all()[id]);
    let isWon = false;
    if ( id !== null && guess.length === 5 ){
        if (guess.toUpperCase() === secretList.all()[id]){
            isWon = true;
        }
        res.send( JSON.stringify({
            Method: 'POST',
            common: common,
            isWon: isWon
        }) );
    }else{
        res.send(JSON.stringify({
            errCode : 'invalid-input-length'
        }));
        res.status(500).end();
    }
});

//

app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
});



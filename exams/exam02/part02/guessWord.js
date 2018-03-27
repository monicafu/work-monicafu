
let historyA = {
    guessOfA : [],
    count:0
};
let historyB = {
    guessOfB : [],
    count:0
};
const guessWord = (mark,guessed,matched,wordlist) => {
    let newGuess = '';
    if (mark.charAt(0) === 'a'){
        let copyListA = [...wordlist];
        if(historyA.count === wordlist.length){
            historyA.count = 0;
        }else{
            let newGuessA = copyListA[historyA.count];
            historyA.count++;
            newGuess = newGuessA;
            console.log("guess A : " + newGuessA);
        }
    }else{
        let copyListB = [...wordlist].reverse();
        if (historyB.count === wordlist.length){
            historyB.count = 0;
        }else{
            let newGuessB = copyListB[historyB.count];
            historyB.count++;
            newGuess = newGuessB;
            console.log("guess B : " + newGuessB);
        }
    }

    return newGuess;
};

module.exports = guessWord;
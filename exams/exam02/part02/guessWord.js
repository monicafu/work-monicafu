const random = require ('./generateWord');
const compare = require ('./compareLetter');


const guessWord = (wordList,guessed,matched) => {
    let copyList = wordList;
    let newGuess = '';
    // console.log('------------------------');
    // console.log("old matched: "+guessed, " , "+matched);
    let temp = [];
    if (guessed === undefined || matched === 0){
        newGuess = random (copyList);
    }else if (matched !== 0){
        const guessedIdx = copyList.indexOf(guessed);
        copyList.splice(guessedIdx,1);
        copyList.forEach((element) =>{
            let common = compare(element,guessed);
            if (common === matched){
                temp.push(element);
            }
        });
        copyList = temp;
        // console.log('copyList len: '+temp.length);
        newGuess = random(copyList);
    }
    // console.log(`new guess :${newGuess}`);
    // console.log('------------------------');
    return newGuess;
};

module.exports = guessWord;
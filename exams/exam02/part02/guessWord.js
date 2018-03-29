const random = require ('./generateWord');
const compare = require ('./compareLetter');


const guessWord = (wordList,guessed,matched) => {
    let copyList = wordList;
    let newGuess = '';
    let temp = [];
    if (guessed === undefined || matched === 0){
        newGuess = random (copyList);
    }else {
        const guessedIdx = copyList.indexOf(guessed);
        copyList.splice(guessedIdx,1);
        copyList.forEach((element) =>{
            let common = compare(element,guessed);
            if (common === matched){
                temp.push(element);
            }
        });
        copyList = temp;
        newGuess = random(copyList);
    }
    return newGuess;
};

module.exports = guessWord;
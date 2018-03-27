const secretList = require('./secretList');
const random = require ('./generateWord');
const compare = require ('./compareLetter');

function searchRange(arr,target) {
    let res = [];
    const letter = target.charAt(0);
    let ll = 0, lr = arr.length - 1;
    while (ll <= lr){
        let mid = parseInt(ll + (lr - ll) / 2);
        if (arr[mid].charAt(0) < letter){
            ll = mid + 1;
        }else{
            lr = mid - 1;
        }
    }
    let rl = 0, rr = arr.length - 1;
    while (rl < rr){
        let mid = parseInt(rl + (rr- rl) / 2);
        if (arr[mid].charAt(0) <= letter){
            rl = mid + 1;
        }else{
            rr = mid - 1;
        }
    }
    if (ll <= rr){
        res[0] = ll;
        res[1] = rr;
    }
    return res;
}

let historyA = {
    guessOfA : [],
    count:0
};
let historyB = {
    guessOfB : [],
    count:0
};
const guessWord = (mark,guessed,matched,wordlist) => {
    //const secList = secretList.getList(mark);
    // console.log('secList in guessWord: '+secList);
    // const answer = secList[secList.length-1];
    // console.log('answer in guessWord: '+answer);
    let newGuess = '';
    // sortedList = sortedList.sort();
    // let range  = searchRange(sortedList,answer);
    // let list = sortedList.slice(range[0],range[1]+1);
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
    // console.log("matched in guessWord: ["+matched+"] guessed: ["+guessed+"]");

    // if (compare(newGuess,answer) < matched || newGuess === guessed){
    //     newGuess = random(list);
    // }
    return newGuess;
};

module.exports = guessWord;
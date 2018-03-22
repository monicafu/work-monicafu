function random(list){
    return list[Math.floor(Math.random() * list.length)];
}

const secretWord = (wordlist) => {
    let word = random(wordlist);
    return word;
};

module.exports = secretWord;
function random(list){
    return list[Math.floor(Math.random() * list.length)];
}

const secretWord = (wordlist) => {
    return random(wordlist);
};

module.exports = secretWord;
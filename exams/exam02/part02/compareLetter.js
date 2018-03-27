const commonLetter = (guess,secret) => {
    let map = [];
    let count = 0;
    guess = guess.toUpperCase();
    for (let letter = 0; letter < secret.length; letter++) {
        if (!map[secret[letter]]) {
            map[secret[letter]] = 0;
        }
        map[secret[letter]]++;
    }
    for (let letter = 0; letter < guess.length; letter++) {
        if (map[guess[letter]] && map[guess[letter]] !== 0) {
            map[guess[letter]]--;
            count++;
        }
    }
    return count;
};

module.exports =  commonLetter;
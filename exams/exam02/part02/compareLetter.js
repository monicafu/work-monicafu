const commonLetter = (guess,secret) => {
    let map = [];
    let count = 0;
    guess = guess.toUpperCase();
    for (let i = 0; i < secret.length; i++) {
        if (!map[secret[i]]) {
            map[secret[i]] = 0;
        }
        map[secret[i]]++;
    }
    for (let i = 0; i < guess.length; i++) {
        if (map[guess[i]] && map[guess[i]] !== 0) {
            map[guess[i]]--;
            count++;
        }
    }
    return count;
};

module.exports =  commonLetter;
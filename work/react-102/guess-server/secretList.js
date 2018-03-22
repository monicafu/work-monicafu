let sceWordList = [];

const secretList = {
    all: () => {
        return sceWordList;
    },
    update : (item) => {
        sceWordList.push(item);
    },
    idx : (word) =>{
        return sceWordList.indexOf(word);
    }

};

module.exports = secretList;

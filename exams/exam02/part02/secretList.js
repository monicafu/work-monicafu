let secWordListA = [];
let secWordListB = [];

const getList = (mark) => {
    if (mark === 'a'){
        return secWordListA;
    }else{
        return secWordListB;
    }
};

const updateList = (mark,item) => {
    if (mark === 'a'){
        secWordListA.push(item);
    }else{
        secWordListB.push(item);
    }
};

const getIndex = (mark, word) => {
    if (mark === 'a'){
        return secWordListA.indexOf(word);
    }else{
        return secWordListB.indexOf(word);
    }
};

module.exports = {
    getList,
    updateList,
    getIndex
};



const bruteForce = function (child,parent) {
    child.word = parent.word;
    child.init = parent.init;
    child.getWord = parent.getWord;
};

module.exports = bruteForce;
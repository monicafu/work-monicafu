const basis = {
    word : '',
    init : function (word) {
        this.word = word;
        return this.word;
    },
    getWord : function () {
        return this.word;
    }
};


module.exports = basis;
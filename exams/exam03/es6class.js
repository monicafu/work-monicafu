const Es6Class = (function () {
    function Es6Class(word) {
        this.word = word;
    }
    Es6Class.prototype.getWord = function () {
        return this.word;
    };
    return Es6Class;
})();


module.exports = Es6Class;

const chain = {
    num : 0,
    result : function(){
        const result = this.num;
        this.num = 0;
        return result;
    },
    one : function () {
        this.num += 1;
        return this;
    },
    two : function(){
        this.num += 2;
        return this;
    }
};

module.exports = chain;
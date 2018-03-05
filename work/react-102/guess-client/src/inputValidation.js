export const inputValidation = (list,word) =>{
    let valid = false;
    if (list.includes(word.toUpperCase())){
        valid = true;
    }else if (word.length === 0 || word === null || word.length < 5){
        valid = false;
    }
    return valid;
};
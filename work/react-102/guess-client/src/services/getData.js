export const getId = () => {
    return fetch('/getId')
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get-id-fail') );
};

export const getWordList = () => {
    return fetch('/getWordList')
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-wordList-fail') );
};

export const getResult = (guess,id) => {
    return fetch('/getResult', {
        method: 'POST',
        body: JSON.stringify({
            guess: guess,
            id : id
        })
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('compare-fail') );
};

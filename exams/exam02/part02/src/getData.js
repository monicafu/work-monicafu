//fetch the id and secret from server
//url = /game
/*export const getIdWord1 = (url) =>{
    return fetch(url,{
        method : 'POST'
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.text()))
        .catch(() => Promise.reject('get-id-fail'));
};*/

export const getIdWord = async (url) => {
    console.log('url in getData '+ url);
    try{
        let res = await fetch(url,{
            method : 'POST',
            Origin: 'http://localhost:3000',
            headers:{'Accept': 'application/json'},
            mode: 'cors'});
        //let obj = JSON.parse(res.json());
        //console.log('response json '+ obj.id,+" "+obj.answer);
        return await res.json();
    }catch(e){
        console.log(e);
        Promise.reject('get-id-word-fail');
    }
};

export const getGuessed = async (url,guessed,matched) => {
    try {
        let res = await fetch(url, {
            method: 'PUT',
            Origin: 'http://localhost:3000',
            mode: 'cors',
            body: JSON.stringify({
                guessed: guessed,
                matches: matched
            })
        });
        return await res.json();
    }catch (e){
        console.log(e);
        Promise.reject('get-guessed-fail');

    }
};


//fetch guess word from server
//url = /game/{id}/guessed
/*export const getGuessed1 = (url,guessed,matched) => {
    //if first call  matched == 0
    //else macthed == ??
    //how to get math
    return fetch (url,{
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({
            guessed : guessed,
            matches : matched
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.text()))
        .catch(() => Promise.reject('get-guessed-fail'));
};*/


export const getResult = async (url) => {
    try {
        const res = fetch(url,{
            method: 'GET',
            Origin: 'http://localhost:3000',
            mode: 'cors',
        });
        return await res.json;
    }catch(e) {
        console.log(e);
        Promise.reject('get-result-fail');
    }

};
//fetch matched letter number from another server
//url = /game/${id}/guess/${guess}
/*
export const getResult1 = (url) => {
    return fetch(url,{
        method: 'GET',
        mode: 'cors',
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.text()))
        .catch(() => Promise.reject('get-result-fail'));
};*/

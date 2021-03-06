export const getIdWord = async (url) => {
    try{
        let res = await fetch(url,{
            method : 'POST',
            Origin: 'http://localhost:3000',
            headers:{'Accept': 'application/json'},
            mode: 'cors'});
        return await res.json();
    }catch(e){
        return Promise.reject('get-id-word-fail');
    }
};

export const getGuessed = async (url,guessed,matched) => {
    try {
        let res = await fetch(url, {
            method: 'PUT',
            Origin: 'http://localhost:3000',
            mode: 'cors',
            body: JSON.stringify({
                guessed:guessed,
                matched:matched
            })
        });
        return await res.json();
    }catch (e){
        return Promise.reject('get-guessed-fail');
    }
};


export const getResult = async (url) => {
    try {
        const res = await fetch(url,{
            method: 'GET',
            Origin: 'http://localhost:3000',
            mode: 'cors',
        });
        return await res.json();
    }catch(e) {
        return Promise.reject('get-result-fail');
    }

};

export const deleteRecord = async (url) => {
    try {
        const res = await fetch (url,{
            method :'DELETE',
            Origin: 'http://localhost:3000',
            mode: 'cors',
        });
        return await res.json();
      }catch(e) {
        return Promise.reject('delete-fail');
      }

};

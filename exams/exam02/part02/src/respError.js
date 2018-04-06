const messages = {
    //connection fail to send request
    'get-id-word-fail': 'Failed to get id and secret from server.',
    'get-guessed-fail': 'Failed to get guess from server.',
    'get-result-fail':'Failed to compare letter from server.',
    'delete-fail':'Failed to delete record from server.',
    'generic-error': 'Uh-oh, something bad happened from server.',
    //client url not valid
    'user-id-invalid':'User id is not valid',
    'user-id-guess-invalid':'User id and guess is not valid',
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};
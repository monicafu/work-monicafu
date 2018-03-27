const messages = {
    'get-id-word-fail': 'Failed to get id and secret from server.',
    'get-guessed-fail': 'Failed to get guess from server.',
    'get-result-fail':'Failed to compare letter from server.',
    'delete-fail':'Failed to delete record from server.',
    'generic-error': 'Uh-oh, something bad happened from server.'
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};
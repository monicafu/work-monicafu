const messages = {
    'get-id-word-fail': 'Failed to get id and secret.  Check your network connection and try again.',
    'get-guessed-fail': 'Failed to get guess from server,Check your network connection and try again.',
    'get-result-fail':'Failed to compate letter,Check your network connection and try again.',
    'generic-error': 'Uh-oh, something bad happened.'
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};
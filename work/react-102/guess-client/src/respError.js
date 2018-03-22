const messages = {
    'get-id-fail': 'Failed to get id.  Check your network connection and try again.',
    'get-wordList-fail': 'Failed to load list,Check your network connection and try again.',
    'compare-fail': 'Failed to compare letter.  Check your network connection and try again.',
    'invalid-input-length':'Failed to deal with the guess.Make sure your input is valid(length = 5).',
    'generic-error': 'Uh-oh, something bad happened.'
};

export const pickErrorMessage = code => {
    if(!code) {
        return '';
    }
    code = messages[code] ? code : 'generic-error';
    return messages[code];
};

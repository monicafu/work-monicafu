const word = 'PARTS';
const guesses = [
	'TREES',
	'TEASE',
	'START',
	'STRAP',
	'LEVEL',
	'PARTS'
];
//compare the number of letters in the same position
function samePosLetter(word, guess){
	let count = 0;
	for (let i = 0; i < word.length; i++) {
		if (word[i] === guess[i]) {
			count++;
		}
	}
	return count;
}
//compare the number of matching letters regardless of position
function commonLetter(word,guess){
	let count = 0;
	let map = [];
	for (let letter of word) {
		if (!map[letter]){
			map[letter] = 0;
		}
		map[letter]++;	
	}
	//console.log(map);
	for (let i = 0; i < guess.length; i++) {
		if ( map[guess[i]] && map[guess[i]] != 0) {
			map[guess[i]]--;
			count++;
		}else{
			continue;
		}
	}
	//console.log(map);
	return count;
}

for (let i = 0; i < guesses.length; i++) {
	console.log(word+" "+guesses[i]+" "+samePosLetter(word,guesses[i])+" "+commonLetter(word,guesses[i]));
	// console.log(samePosLetter(word,guesses[i]));
	// console.log(commonLetter(word,guesses[i]));
}

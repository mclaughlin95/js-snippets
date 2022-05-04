'use strict'

/**
 * A module used to randomize characters of a string. This is extremely useful for checking 
 * translations within a user interface.
 * 
 * Type: Module
 * 
 * Author: Corey Lee McLaughlin
 */
let gibberish = (() => {

	/**
	 * A string containing a list of clean characters.
	 * 
	 * Isolated as a private variable to prevent variable reinstantion when
	 * getRandomCharacter() is called
	 * 
	 * Type: Private Function
	 * 
	 * Author: Corey Lee McLaughlin
	 * 
	 */
	let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

	/**
	 * Will generate a random character
	 * 
	 * Numbers: 0-9
	 * Captial Letters: A-Z
	 * Lower Case Letters: a-z
	 * 
	 * Type: Public Function
	 * 
	 * Author: Corey Lee McLaughlin
	 * 
	 * @returns {string} a random character 
	 */
	function getRandomCharacter() {
		return characters[Math.floor(Math.random() * characters.length)];
	}
	
	/**
	 * Randomizes characters of a string with number, upper case or lower case letters while
	 * preserving spaces.
	 * 
	 * Type: Public Function
	 * 
	 * Author: Corey Lee McLaughlin
	 * 
	 * @param {String} text a string of text to replace
	 * @throws {String} will throw an error if text parameter is not a string
	 * @returns {String} a string of randomized characters
	 */
	function translate(text) {
		if (typeof text != 'string') { throw 'Invalid text'; }
		let response = '';
		for (let i = 0; i < text.length; i++) {
			if (text[i] == ' ') {
				response += ' ';
			} else {
				response += this.getRandomCharacter();
			}
		}
		return response;
	}

	return {
		getRandomCharacter: getRandomCharacter,
		translate: translate
	};

})();

export default gibberish;
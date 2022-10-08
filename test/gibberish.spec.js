const gibberish = require('../src/gibberish.js');

describe('gibberish', () =>{

    describe('randomCharacter', () => {
    
        it('Returns string', () => {
            let response = gibberish.getRandomCharacter('t');
            expect(typeof response).toEqual('string');
        });
    
        it('Replaces character with something random', () => {
            let character = '#';
            let response = gibberish.getRandomCharacter(character);
            expect(response).not.toEqual(character);
        });
    
    });
    
    describe('gibberish.translate()', () => {
    
        let errorMessage = 'Invalid text';
    
        it('Undefined text parameter', () => {
            try {
                gibberish.translate();
                throw 'Allowed an undefined text parameter';
            } catch (err) {
                expect(err).toEqual(errorMessage);
            }
        });
    
        it('Invalid text parameter data type', () => {
            try {
                gibberish.translate(1234);
                throw 'Allowed an invalid text parameter data type';
            } catch (err) {
                expect(err).toEqual(errorMessage);
            }
        });
    
        it('Returns string', () => {
            let response = gibberish.translate('test');
            expect(typeof response).toEqual('string');
        });
    
        it('String is randomized', () => {
            let text = '@#$';
            let response = gibberish.translate(text);
            expect(response).not.toEqual(text);
        });

        it('Preserve Spaces', () => {
            let text = '0123 5678';
            expect(text[4]).toEqual(' ');
            let response = gibberish.translate(text);
            expect(response[4]).toEqual(' ');

        });
    
    });

});
import { calculateSunrise } from '../src/sunrise.js';

describe('sunrise()', () => {

    it('Test A', () => {
        console.log(calculateSunrise(20220429, -77, 41));
        expect(true).toEqual(true);
    });

});
import { calculateSunrise, convertHour } from '../src/sunrise.js';

describe('sunrise()', () => {

    it('Test A', () => {
        let year = '2022';
        let month = '04';
        let day = '29';
        let date = year + month + day;
        let lon = '-78';
        let lat = '41';
    
        let data = calculateSunrise(date, lon, lat);

        // Sunrise Conversion
        let sunriseDecimalHour = convertHour(data.rise);
        let sunriseUTC = Date.UTC(
            parseInt(year), 
            parseInt(month), 
            parseInt(day), 
            parseInt(sunriseDecimalHour.split(':')[0]), 
            parseInt(sunriseDecimalHour.split(':')[1]), 
            0, 
            0
        );
        let sunrise = new Date(sunriseUTC).toLocaleString();
        console.log(sunrise);

        expect(true).toEqual(true);
    });

});
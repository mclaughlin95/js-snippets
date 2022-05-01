import sunrise from '../src/sunrise.js';

describe('sunrise()', () => {

    // it('Test A', () => {
    //     let year = '2022';
    //     let month = '04';
    //     let day = '29';
    //     let date = year + month + day;
    //     let lon = '-78';
    //     let lat = '41';
    
    //     let data = calculateSunrise(date, lon, lat);

    //     // Sunrise Conversion
    //     let sunriseDecimalHour = convertHour(data.rise);
    //     let sunriseUTC = Date.UTC(
    //         parseInt(year), 
    //         parseInt(month), 
    //         parseInt(day), 
    //         parseInt(sunriseDecimalHour.split(':')[0]), 
    //         parseInt(sunriseDecimalHour.split(':')[1]), 
    //         0, 
    //         0
    //     );
    //     let sunrise = new Date(sunriseUTC).toLocaleString();
    //     console.log(sunrise);

    //     expect(true).toEqual(true);
    // });

    describe('isValidYear()', () => {

        it('Undefined year', () => {
            expect(sunrise.isValidYear()).toBeFalse();
            expect(sunrise.isValidYear(undefined)).toBeFalse();
        });

        it('Year is number data type', () => {
            expect(sunrise.isValidYear(2022)).toBeTrue();
        });

        it('Year is greater than 0', () => {
            expect(sunrise.isValidYear(0)).toBeFalse();
        });

        it('Year is four digits', () => {
            expect(sunrise.isValidYear(10000)).toBeFalse();
        });

        it('Year is a whole number', () => {
            expect(sunrise.isValidYear(25.5)).toBeFalse();
        });

    });

    describe('isValidMonth()', () => {

        it('Undefined month parameter', () => {
            expect(sunrise.isValidMonth()).toBeFalse();
            expect(sunrise.isValidMonth(undefined)).toBeFalse();
        });

        it('Month number data type', () => {
            expect(sunrise.isValidMonth(5)).toBeTrue();
        });

        it('Month is greater than 0', () => {
            expect(sunrise.isValidMonth(0)).toBeFalse();
        });

        it('Month is less than or equal to 12', () => {
            expect(sunrise.isValidMonth(13)).toBeFalse();
        });

        it('Month is a whole number', () => {
            expect(sunrise.isValidMonth(2.5)).toBeFalse();
        });

    });

    describe('isValidDay()', () => {

        it('Undefined day parameter', () => {
            expect(sunrise.isValidDay()).toBeFalse();
            expect(sunrise.isValidDay(undefined)).toBeFalse();
        });

        it('Day number data type', () => {
            expect(sunrise.isValidDay(1)).toBeTrue();
        });

        it('Day is greater than 0', () => {
            expect(sunrise.isValidDay(0)).toBeFalse();
        });

        it('Day is less than or equal to 31', () => {
            expect(sunrise.isValidDay(32)).toBeFalse();
        });

        it('Day is a whole number', () => {
            expect(sunrise.isValidDay(1.5)).toBeFalse();
        });

    });

    describe('isLeapYear()', () => {

        it('Valid year', () => {
            try {
                sunrise.isLeapYear('foobar');
                throw 'Allowed an invalid year';
            } catch (err) {
                expect(err).toEqual('Invalid year');
            }
        });

        it('Non leap year', () => {
            expect(sunrise.isLeapYear(2022)).toBeFalse();
        });

        it('Leap year divisable by 4', () => {
            expect(sunrise.isLeapYear(2016)).toBeTrue();
        });

        it('Leap year is not divisable by 100', () => {
            expect(sunrise.isLeapYear(2022)).toBeFalse();
        });

        it('Leap year is divisable by 400', () => {
            expect(sunrise.isLeapYear(2000)).toBeTrue();
        });

    });

    describe('getMonthDays', () => {

        it('Invalid month', () => {
            try {
                sunrise.getMonthDays(5.5);
                throw 'Allowed invalid month';
            } catch (err) {
                expect(err).toEqual('Invalid month');
            }
        });

        it('Invalid year', () => {
            try {
                sunrise.getMonthDays(5, 2022.5);
                throw 'Allowed invalid year';
            } catch (err) {
                expect(err).toEqual('Invalid year');
            }
        });

        it('Nonleap Year Months Days', () => {
            let year = 2022;
            expect(sunrise.getMonthDays(1, year)).toEqual(31); // January
            expect(sunrise.getMonthDays(2, year)).toEqual(28); // February
            expect(sunrise.getMonthDays(3, year)).toEqual(31); // March
            expect(sunrise.getMonthDays(4, year)).toEqual(30); // April
            expect(sunrise.getMonthDays(5, year)).toEqual(31); // May
            expect(sunrise.getMonthDays(6, year)).toEqual(30); // June
            expect(sunrise.getMonthDays(7, year)).toEqual(31); // July
            expect(sunrise.getMonthDays(8, year)).toEqual(31); // August
            expect(sunrise.getMonthDays(9, year)).toEqual(30); // September
            expect(sunrise.getMonthDays(10, year)).toEqual(31); // October
            expect(sunrise.getMonthDays(11, year)).toEqual(30); // November
            expect(sunrise.getMonthDays(12, year)).toEqual(31); // December
        });

        it('Leap Year Months Days', () => {
            let year = 2000;
            expect(sunrise.getMonthDays(1, year)).toEqual(31); // January
            expect(sunrise.getMonthDays(2, year)).toEqual(29); // February
            expect(sunrise.getMonthDays(3, year)).toEqual(31); // March
            expect(sunrise.getMonthDays(4, year)).toEqual(30); // April
            expect(sunrise.getMonthDays(5, year)).toEqual(31); // May
            expect(sunrise.getMonthDays(6, year)).toEqual(30); // June
            expect(sunrise.getMonthDays(7, year)).toEqual(31); // July
            expect(sunrise.getMonthDays(8, year)).toEqual(31); // August
            expect(sunrise.getMonthDays(9, year)).toEqual(30); // September
            expect(sunrise.getMonthDays(10, year)).toEqual(31); // October
            expect(sunrise.getMonthDays(11, year)).toEqual(30); // November
            expect(sunrise.getMonthDays(12, year)).toEqual(31); // December
        });

    });

    describe('isValidDate()', () => {

        let year = 2022;
        let month = 2;
        let day = 1;

        it('Invalid year', () => {
            expect(sunrise.isValidDate(20.5, month, day)).toBeFalse();
        });

        it('Invalid month', () => {
            expect(sunrise.isValidDate(year, 5.5, day)).toBeFalse();
        });

        it('Invalid day', () => {
            expect(sunrise.isValidDate(year, month, 1.5)).toBeFalse();
        });

        it('Invalid leap year month days', () => {
            expect(sunrise.isValidDate(year, month, 29)).toBeFalse();
        });

        it('Valid leap year month days', () => {
            expect(sunrise.isValidDate(2000, month, 29));
        });

    });



});
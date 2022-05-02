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

    describe('getDayOfYear()', () => {

        it('Invalid date', () => {
            try {
                sunrise.getDayOfYear(202.5, 5, 1);
                throw 'Allowed an invalid date';
            } catch (err) {
                expect(err).toEqual('Invalid date');
            }
        });

        it('Returns day of year', () => {
            let year = 2022;
            let month = 5;
            let day = 1;
            let expected = (() => {
                let n1 = Math.floor(275 * month / 9);
                let n2 = Math.floor((month + 9) / 12);
                let n3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3))
                let n = n1 - (n2 * n3) + day -30;
                return n;
            })();
            let response = sunrise.getDayOfYear(year, month, day);
            expect(response).toEqual(expected);
        });

    });

    describe('isValidLon()', () => {

        it('Undefined lon parameter', () => {
            expect(sunrise.isValidLon()).toBeFalse();
            expect(sunrise.isValidLon(undefined)).toBeFalse();
        });

        it('Invalid negative lon', () => {
            expect(sunrise.isValidLon(-181)).toBeFalse();
            expect(sunrise.isValidLon(-180)).toBeTrue();
        });

        it('Invalid positive lon', () => {
            expect(sunrise.isValidLon(181)).toBeFalse();
            expect(sunrise.isValidLon(180)).toBeTrue();
        });

    });

    describe('isValidLat()', () => {

        it('Undefined lat parameter', () => {
            expect(sunrise.isValidLat()).toBeFalse();
            expect(sunrise.isValidLat(undefined)).toBeFalse();
        });

        it('Invalid negative lat', () => {
            expect(sunrise.isValidLat(-91)).toBeFalse();
            expect(sunrise.isValidLat(-90)).toBeTrue();
        });

        it('Invalid postive lat', () => {
            expect(sunrise.isValidLat(91)).toBeFalse();
            expect(sunrise.isValidLat(90)).toBeTrue();
        });

    });

    describe('getLonUTCOffset', () => {

        it('Invalid lon parameter', () => {
            try {
                sunrise.getLonUTCOffset(-800);
                throw 'Allowed invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Returns expected lon hour', () => {
            let lon = -78;
            let expected = lon / 15;
            let response = sunrise.getLonUTCOffset(lon);
            expect(response).toEqual(expected);
        });

    });

    describe('isValidDayOfYear()', () => {

        it('Undefined day parameter', () => {
            expect(sunrise.isValidDayOfYear()).toBeFalse();
            expect(sunrise.isValidDayOfYear(undefined)).toBeFalse();
        });

        it('Day must be greater than 0', () => {
            expect(sunrise.isValidDayOfYear(0)).toBeFalse();
            expect(sunrise.isValidDayOfYear(1)).toBeTrue();
        });

        it('Day must be less than 366 (including leap year)', () => {
            expect(sunrise.isValidDayOfYear(367)).toBeFalse();
            expect(sunrise.isValidDayOfYear(366)).toBeTrue();
        });

    });


    describe('getRisingTime()', () => {

        it('Invalid lon parameter', () => {
            try {
                sunrise.getRisingTime('foobar');
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Invalid dayOfYear parameter', () => {
            try {
                sunrise.getRisingTime(-78, 'foobar');
                throw 'Allowed an invalid dayOfYear parameter';
            } catch (err) {
                expect(err).toEqual('Invalid dayOfYear');
            }
        });
        
        it('Checking Rising Time', () => {
            let lon = -78;
            let dayOfYear = sunrise.getDayOfYear(2022, 5, 1);
            let utcOffset = sunrise.getLonUTCOffset(lon);
            let expected = dayOfYear + ((6 - utcOffset) / 24);
            let response = sunrise.getRisingTime(lon, dayOfYear);
            expect(response).toEqual(expected);
        });

    });

    describe('getSettingTime()', () => {

        it('Invalid lon parameter', () => {
            try {
                sunrise.getSettingTime('foobar');
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Invalid dayOfYear parameter', () => {
            try {
                sunrise.getSettingTime(-78, 'foobar');
                throw 'Allowed an invalid dayOfYear parameter';
            } catch (err) {
                expect(err).toEqual('Invalid dayOfYear');
            }
        });

        it('Checking Setting Time', () => {
            let lon = -78;
            let dayOfYear = sunrise.getDayOfYear(2022, 5, 1);
            let utcOffset = sunrise.getLonUTCOffset(lon);
            let expected = dayOfYear + ((18 - utcOffset) / 24);
            let response = sunrise.getSettingTime(lon, dayOfYear);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsMeanAnomaly()', () => {

        it('Undefined time parameter', () => {
            try {
                sunrise.getSunsMeanAnomaly();
                throw 'Allowed undefined time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Invalid time parameter data type', () => {
            try {
                sunrise.getSunsMeanAnomaly('foobar');
                throw 'Allowed invalid time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Calculating Suns Mean Anomaly (Based on Rising Time)', () => {
            let lon = -78;
            let dayOfYear = sunrise.getDayOfYear(2022, 5, 1);
            let time = sunrise.getRisingTime(lon, dayOfYear);
            let expected = (0.9856 * time) - 3.289;
            let response = sunrise.getSunsMeanAnomaly(time);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsTrueLon()', () => {

        it('Undefined sunsMeanAnomaly parameter', () => {
            try {
                sunrise.getSunsTrueLon();
                throw 'Allowed undefined sunsMeanAnomaly parameter';
            } catch (err) {
                expect(err).toEqual('Invalid sunsMeanAnomaly');
            }
        });

        it('Invalid sunsMeanAnomaly parameter data type', () => {
            try {
                sunrise.getSunsTrueLon('foobar');
                throw 'Allowed invalid sunsMeanAnomaly parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid sunsMeanAnomaly');
            }
        });

        it('Calculating the Suns True Longitude (Based on Rising Time)', () => {
            let lon = -78;
            let dayOfYear = sunrise.getDayOfYear(2022, 5, 1);
            let time = sunrise.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sunrise.getSunsMeanAnomaly(time);
            let expected = sunsMeanAnomaly + (1.916 * Math.sin((Math.PI / 180.0) * sunsMeanAnomaly)) + (0.020 * Math.sin(2.0 * (Math.PI / 180.0) * sunsMeanAnomaly)) + 282.634;
            if (expected < 0.0) {
                expected += 360.0;
            } else if (expected >= 360.0) {
                expected -= 360.0;
            }
            let response = sunrise.getSunsTrueLon(sunsMeanAnomaly);
            expect(response).toEqual(expected);
        });

    });

    // Step 5 A-C
    describe('getSunsRightAscension()', () => {

        it('Undefined sunsTrueLon', () => {
            try {
                sunrise.getSunsRightAscension();
                throw 'Allowed an undefined sunsTrueLon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Invalid sunsTrueLon parameter data type', () => {
            try {
                sunrise.getSunsRightAscension('foobar');
                throw 'Allowed an invalid sunsTrueLon parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Calculating Suns Right Ascension', () => {
            let lon = -78;
            let dayOfYear = sunrise.getDayOfYear(2022, 5, 1);
            let time = sunrise.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sunrise.getSunsMeanAnomaly(time);
            let sunsTrueLon = sunrise.getSunsTrueLon(sunsMeanAnomaly);
            let rightAscension = (180.0 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180.0) * sunsTrueLon));
            let lquadrant = (Math.floor(sunsTrueLon / 90.0)) * 90.0;
            let raquadrant = (Math.floor(rightAscension / 90.0)) * 90.0;
            rightAscension = rightAscension + (lquadrant - raquadrant);
            rightAscension /= 15.0;
            let expected = rightAscension;
            let response = sunrise.getSunsRightAscension(sunsTrueLon);
            expect(response).toEqual(expected);
        });

    });

});
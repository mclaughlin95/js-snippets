import sun from '../src/sun.js';
import { calculateSunrise } from '../src/sun.js';

describe('sun', () => {

    describe('isValidYear()', () => {

        it('Undefined year', () => {
            expect(sun.isValidYear()).toBeFalse();
            expect(sun.isValidYear(undefined)).toBeFalse();
        });

        it('Year is number data type', () => {
            expect(sun.isValidYear(2022)).toBeTrue();
        });

        it('Year is greater than 0', () => {
            expect(sun.isValidYear(0)).toBeFalse();
        });

        it('Year is four digits', () => {
            expect(sun.isValidYear(10000)).toBeFalse();
        });

        it('Year is a whole number', () => {
            expect(sun.isValidYear(25.5)).toBeFalse();
        });

    });

    describe('isValidMonth()', () => {

        it('Undefined month parameter', () => {
            expect(sun.isValidMonth()).toBeFalse();
            expect(sun.isValidMonth(undefined)).toBeFalse();
        });

        it('Month number data type', () => {
            expect(sun.isValidMonth(5)).toBeTrue();
        });

        it('Month is greater than 0', () => {
            expect(sun.isValidMonth(0)).toBeFalse();
        });

        it('Month is less than or equal to 12', () => {
            expect(sun.isValidMonth(13)).toBeFalse();
        });

        it('Month is a whole number', () => {
            expect(sun.isValidMonth(2.5)).toBeFalse();
        });

    });

    describe('isValidDay()', () => {

        it('Undefined day parameter', () => {
            expect(sun.isValidDay()).toBeFalse();
            expect(sun.isValidDay(undefined)).toBeFalse();
        });

        it('Day number data type', () => {
            expect(sun.isValidDay(1)).toBeTrue();
        });

        it('Day is greater than 0', () => {
            expect(sun.isValidDay(0)).toBeFalse();
        });

        it('Day is less than or equal to 31', () => {
            expect(sun.isValidDay(32)).toBeFalse();
        });

        it('Day is a whole number', () => {
            expect(sun.isValidDay(1.5)).toBeFalse();
        });

    });

    describe('isLeapYear()', () => {

        it('Valid year', () => {
            try {
                sun.isLeapYear('foobar');
                throw 'Allowed an invalid year';
            } catch (err) {
                expect(err).toEqual('Invalid year');
            }
        });

        it('Non leap year', () => {
            expect(sun.isLeapYear(2022)).toBeFalse();
        });

        it('Leap year divisable by 4', () => {
            expect(sun.isLeapYear(2016)).toBeTrue();
        });

        it('Leap year is not divisable by 100', () => {
            expect(sun.isLeapYear(2022)).toBeFalse();
        });

        it('Leap year is divisable by 400', () => {
            expect(sun.isLeapYear(2000)).toBeTrue();
        });

    });

    describe('getMonthDays', () => {

        it('Invalid month', () => {
            try {
                sun.getMonthDays(5.5);
                throw 'Allowed invalid month';
            } catch (err) {
                expect(err).toEqual('Invalid month');
            }
        });

        it('Invalid year', () => {
            try {
                sun.getMonthDays(5, 2022.5);
                throw 'Allowed invalid year';
            } catch (err) {
                expect(err).toEqual('Invalid year');
            }
        });

        it('Nonleap Year Months Days', () => {
            let year = 2022;
            expect(sun.getMonthDays(1, year)).toEqual(31); // January
            expect(sun.getMonthDays(2, year)).toEqual(28); // February
            expect(sun.getMonthDays(3, year)).toEqual(31); // March
            expect(sun.getMonthDays(4, year)).toEqual(30); // April
            expect(sun.getMonthDays(5, year)).toEqual(31); // May
            expect(sun.getMonthDays(6, year)).toEqual(30); // June
            expect(sun.getMonthDays(7, year)).toEqual(31); // July
            expect(sun.getMonthDays(8, year)).toEqual(31); // August
            expect(sun.getMonthDays(9, year)).toEqual(30); // September
            expect(sun.getMonthDays(10, year)).toEqual(31); // October
            expect(sun.getMonthDays(11, year)).toEqual(30); // November
            expect(sun.getMonthDays(12, year)).toEqual(31); // December
        });

        it('Leap Year Months Days', () => {
            let year = 2000;
            expect(sun.getMonthDays(1, year)).toEqual(31); // January
            expect(sun.getMonthDays(2, year)).toEqual(29); // February
            expect(sun.getMonthDays(3, year)).toEqual(31); // March
            expect(sun.getMonthDays(4, year)).toEqual(30); // April
            expect(sun.getMonthDays(5, year)).toEqual(31); // May
            expect(sun.getMonthDays(6, year)).toEqual(30); // June
            expect(sun.getMonthDays(7, year)).toEqual(31); // July
            expect(sun.getMonthDays(8, year)).toEqual(31); // August
            expect(sun.getMonthDays(9, year)).toEqual(30); // September
            expect(sun.getMonthDays(10, year)).toEqual(31); // October
            expect(sun.getMonthDays(11, year)).toEqual(30); // November
            expect(sun.getMonthDays(12, year)).toEqual(31); // December
        });

    });

    describe('isValidDate()', () => {

        let year = 2022;
        let month = 2;
        let day = 1;

        it('Invalid year', () => {
            expect(sun.isValidDate(20.5, month, day)).toBeFalse();
        });

        it('Invalid month', () => {
            expect(sun.isValidDate(year, 5.5, day)).toBeFalse();
        });

        it('Invalid day', () => {
            expect(sun.isValidDate(year, month, 1.5)).toBeFalse();
        });

        it('Invalid leap year month days', () => {
            expect(sun.isValidDate(year, month, 29)).toBeFalse();
        });

        it('Valid leap year month days', () => {
            expect(sun.isValidDate(2000, month, 29));
        });

    });

    describe('getDayOfYear()', () => {

        it('Invalid date', () => {
            try {
                sun.getDayOfYear(202.5, 5, 1);
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
            let response = sun.getDayOfYear(year, month, day);
            expect(response).toEqual(expected);
        });

    });

    describe('isValidLon()', () => {

        it('Undefined lon parameter', () => {
            expect(sun.isValidLon()).toBeFalse();
            expect(sun.isValidLon(undefined)).toBeFalse();
        });

        it('Invalid negative lon', () => {
            expect(sun.isValidLon(-181)).toBeFalse();
            expect(sun.isValidLon(-180)).toBeTrue();
        });

        it('Invalid positive lon', () => {
            expect(sun.isValidLon(181)).toBeFalse();
            expect(sun.isValidLon(180)).toBeTrue();
        });

    });

    describe('isValidLat()', () => {

        it('Undefined lat parameter', () => {
            expect(sun.isValidLat()).toBeFalse();
            expect(sun.isValidLat(undefined)).toBeFalse();
        });

        it('Invalid negative lat', () => {
            expect(sun.isValidLat(-91)).toBeFalse();
            expect(sun.isValidLat(-90)).toBeTrue();
        });

        it('Invalid postive lat', () => {
            expect(sun.isValidLat(91)).toBeFalse();
            expect(sun.isValidLat(90)).toBeTrue();
        });

    });

    describe('getLonUTCOffset', () => {

        it('Invalid lon parameter', () => {
            try {
                sun.getLonUTCOffset(-800);
                throw 'Allowed invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Returns expected lon hour', () => {
            let lon = -78;
            let expected = lon / 15;
            let response = sun.getLonUTCOffset(lon);
            expect(response).toEqual(expected);
        });

    });

    describe('isValidDayOfYear()', () => {

        it('Undefined day parameter', () => {
            expect(sun.isValidDayOfYear()).toBeFalse();
            expect(sun.isValidDayOfYear(undefined)).toBeFalse();
        });

        it('Day must be greater than 0', () => {
            expect(sun.isValidDayOfYear(0)).toBeFalse();
            expect(sun.isValidDayOfYear(1)).toBeTrue();
        });

        it('Day must be less than 366 (including leap year)', () => {
            expect(sun.isValidDayOfYear(367)).toBeFalse();
            expect(sun.isValidDayOfYear(366)).toBeTrue();
        });

    });


    describe('getRisingTime()', () => {

        it('Invalid lon parameter', () => {
            try {
                sun.getRisingTime('foobar');
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Invalid dayOfYear parameter', () => {
            try {
                sun.getRisingTime(-78, 'foobar');
                throw 'Allowed an invalid dayOfYear parameter';
            } catch (err) {
                expect(err).toEqual('Invalid dayOfYear');
            }
        });
        
        it('Checking Rising Time', () => {
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let utcOffset = sun.getLonUTCOffset(lon);
            let expected = dayOfYear + ((6 - utcOffset) / 24);
            let response = sun.getRisingTime(lon, dayOfYear);
            expect(response).toEqual(expected);
        });

    });

    describe('getSettingTime()', () => {

        it('Invalid lon parameter', () => {
            try {
                sun.getSettingTime('foobar');
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Invalid dayOfYear parameter', () => {
            try {
                sun.getSettingTime(-78, 'foobar');
                throw 'Allowed an invalid dayOfYear parameter';
            } catch (err) {
                expect(err).toEqual('Invalid dayOfYear');
            }
        });

        it('Checking Setting Time', () => {
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let utcOffset = sun.getLonUTCOffset(lon);
            let expected = dayOfYear + ((18 - utcOffset) / 24);
            let response = sun.getSettingTime(lon, dayOfYear);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsMeanAnomaly()', () => {

        it('Undefined time parameter', () => {
            try {
                sun.getSunsMeanAnomaly();
                throw 'Allowed undefined time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Invalid time parameter data type', () => {
            try {
                sun.getSunsMeanAnomaly('foobar');
                throw 'Allowed invalid time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Calculating Suns Mean Anomaly (Based on Rising Time)', () => {
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let time = sun.getRisingTime(lon, dayOfYear);
            let expected = (0.9856 * time) - 3.289;
            let response = sun.getSunsMeanAnomaly(time);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsTrueLon()', () => {

        it('Undefined sunsMeanAnomaly parameter', () => {
            try {
                sun.getSunsTrueLon();
                throw 'Allowed undefined sunsMeanAnomaly parameter';
            } catch (err) {
                expect(err).toEqual('Invalid sunsMeanAnomaly');
            }
        });

        it('Invalid sunsMeanAnomaly parameter data type', () => {
            try {
                sun.getSunsTrueLon('foobar');
                throw 'Allowed invalid sunsMeanAnomaly parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid sunsMeanAnomaly');
            }
        });

        it('Calculating the Suns True Longitude (Based on Rising Time)', () => {
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let time = sun.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sun.getSunsMeanAnomaly(time);
            let expected = sunsMeanAnomaly + (1.916 * Math.sin((Math.PI / 180.0) * sunsMeanAnomaly)) + (0.020 * Math.sin(2.0 * (Math.PI / 180.0) * sunsMeanAnomaly)) + 282.634;
            if (expected < 0.0) {
                expected += 360.0;
            } else if (expected >= 360.0) {
                expected -= 360.0;
            }
            let response = sun.getSunsTrueLon(sunsMeanAnomaly);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsRightAscension()', () => {

        it('Undefined sunsTrueLon', () => {
            try {
                sun.getSunsRightAscension();
                throw 'Allowed an undefined sunsTrueLon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Invalid sunsTrueLon parameter data type', () => {
            try {
                sun.getSunsRightAscension('foobar');
                throw 'Allowed an invalid sunsTrueLon parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Calculating Suns Right Ascension', () => {
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let time = sun.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sun.getSunsMeanAnomaly(time);
            let sunsTrueLon = sun.getSunsTrueLon(sunsMeanAnomaly);
            let rightAscension = (180.0 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180.0) * sunsTrueLon));
            let lquadrant = (Math.floor(sunsTrueLon / 90.0)) * 90.0;
            let raquadrant = (Math.floor(rightAscension / 90.0)) * 90.0;
            rightAscension = rightAscension + (lquadrant - raquadrant);
            rightAscension /= 15.0;
            let expected = rightAscension;
            let response = sun.getSunsRightAscension(sunsTrueLon);
            expect(response).toEqual(expected);
        });

    });

    describe('getSunsLocalHourAngle()', () => {

        it('Undefined sunsTrueLon parameter', () => {
            try {
                sun.getSunsLocalHourAngle();
                throw 'Allowed an undefined sunsTrueLon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Invalid sunsTrueLon parameter data type', () => {
            try {
                sun.getSunsLocalHourAngle('foobar');
                throw 'Allowed an invalid sunsTrueLon parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid sunsTrueLon');
            }
        });

        it('Invalid lat parameter', () => {
            try {
                sun.getSunsLocalHourAngle(5, 'foobar');
                throw 'Allowed an invalid lat parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lat');
            }
        });

        it('Calculating Suns Local Hour', () => {
            let lat = 41;
            let lon = -78;
            let dayOfYear = sun.getDayOfYear(2022, 5, 1);
            let time = sun.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sun.getSunsMeanAnomaly(time);
            let sunsTrueLon = sun.getSunsTrueLon(sunsMeanAnomaly);
            let sinDeclination = 0.39782 * Math.sin((Math.PI / 180.0) * sunsTrueLon);
            let cosDeclination = Math.cos(Math.asin(sinDeclination));
            let cosHour = (Math.cos((Math.PI / 180.0) * sun.zenith) - (sinDeclination * Math.sin((Math.PI / 180.0) * lat))) / (cosDeclination * Math.cos((Math.PI / 180.0) * lat));
            let expected = cosHour;
            let response = sun.getSunsLocalHourAngle(sunsTrueLon, lat);
            expect(response).toEqual(expected);
        });

    });

    describe('getLocalMeanTime()', () => {

        it('Undefined hours parameter', () => {
            try {
                sun.getLocalMeanTime();
                throw 'Allowed an undefined hours parameter';
            } catch (err) {
                expect(err).toEqual('Invalid hours');
            }
        });

        it('Invalid hours parameter data type', () => {
            try {
                sun.getLocalMeanTime('foobar');
                throw 'Allowed an invalid hours parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid hours');
            }
        });

        it('Undefined time parameter', () => {
            try {
                sun.getLocalMeanTime(5);
                throw 'Allowed an undefined time parameter';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Invalid time parameter data type', () => {
            try {
                sun.getLocalMeanTime(5, 'foobar');
                throw 'Allowed an invalid time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Undefined rightAscenstion parameter', () => {
            try {
                sun.getLocalMeanTime(5, 5);
                throw 'Allowed an undefined rightAscension parameter';
            } catch (err) {
                expect(err).toEqual('Invalid rightAscension');
            }
        });

        it('Invalid rightAscension parameter', () => {
            try {
                sun.getLocalMeanTime(5, 5, 'foobar');
                throw 'Allowed an invalid rightAscension parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid rightAscension');
            }
        });

        it('Calculating Local Mean Time', () => {
            let hours = 5;
            let time = 5;
            let rightAscension = 0.5;
            let expected = hours + rightAscension - (0.06571 * time) - 6.622;
            let response = sun.getLocalMeanTime(hours, time, rightAscension);
            expect(response).toEqual(expected);
        });

    });

    describe('toUTC()', () => {

        it('Undefined time parameter', () => {
            try {
                sun.toUTC();
                throw 'Allowed an undefined time parameter';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Invalid time parameter data type', () => {
            try {
                sun.toUTC('foobar');
                throw 'Allowed an invalid time parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid time');
            }
        });

        it('Undefined offset parameter', () => {
            try {
                sun.toUTC(5);
                throw 'Allowed an undefined offset parameter';
            } catch (err) {
                expect(err).toEqual('Invalid offset');
            }
        });

        it('Invalid offset parameter', () => {
            try {
                sun.toUTC(5, 'foobar');
                throw 'Allowed an invalid offset parameter data type';
            } catch (err) {
                expect(err).toEqual('Invalid offset');
            }
        });

        it('Checking UTC conversion', () => {
            let time = 5;
            let offset = -2;
            let utc = time - offset;
            let response = sun.toUTC(time, offset);
            expect(response).toEqual(utc);
        });

    });

    describe('sunrise()', () => {

        let year = 2022;
        let month = 5;
        let day = 1;
        let lat = 41;
        let lon = -78;
        let invalidDate = 'Invalid date';

        it('Invalid year parameter', () => {
            try {
                sun.sunrise('foobar');
                throw 'Allowed an invalid year parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid month parameter', () => {
            try {
                sun.sunrise(year, 'foobar');
                throw 'Allowed an invalid month parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid day parameter', () => {
            try {
                sun.sunrise(year, month, 'foobar');
                throw 'Allowed an invalid day parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid Date - Not a Leap Year', () => {
            try {
                sun.sunrise(year, 2, 29);
                throw 'Allowed an invalid date. Not a leap year';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid lat', () => {
            try {
                sun.sunrise(year, month, day, -300);
                throw 'Allowed an invalid lat parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lat');
            }
        });

        it('Invalid lon', () => {
            try {
                sun.sunrise(year, month, day, lat, -300);
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Calculating Sunrise', () => {
            let dayOfYear = sun.getDayOfYear(year, month, day);
            let utcOffset = sun.getLonUTCOffset(lon);
            let risingTime = sun.getRisingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sun.getSunsMeanAnomaly(risingTime);
            let sunsTrueLon = sun.getSunsTrueLon(sunsMeanAnomaly);
            let sunsRightAscension = sun.getSunsRightAscension(sunsTrueLon);
            let sunsLocalHourAngle = sun.getSunsLocalHourAngle(sunsTrueLon, lat);
            let hours = (360.0 - (180.0 / Math.PI) * Math.acos(sunsLocalHourAngle)) / 15;
            let localMeanTime = sun.getLocalMeanTime(hours, risingTime, sunsRightAscension);
            let time = sun.toUTC(localMeanTime, utcOffset);
            let response = sun.sunrise(year, month, day, lat, lon);
            expect(response).toEqual(time);
        });

    });

    describe('sunset()', () => {

        let year = 2022;
        let month = 5;
        let day = 1;
        let lat = 41;
        let lon = -78;
        let invalidDate = 'Invalid date';

        it('Invalid year parameter', () => {
            try {
                sun.sunset('foobar');
                throw 'Allowed an invalid year parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid month parameter', () => {
            try {
                sun.sunset(year, 'foobar');
                throw 'Allowed an invalid month parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid day parameter', () => {
            try {
                sun.sunset(year, month, 'foobar');
                throw 'Allowed an invalid day parameter';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid Date - Not a Leap Year', () => {
            try {
                sun.sunset(year, 2, 29);
                throw 'Allowed an invalid date. Not a leap year';
            } catch (err) {
                expect(err).toEqual(invalidDate);
            }
        });

        it('Invalid lat', () => {
            try {
                sun.sunset(year, month, day, -300);
                throw 'Allowed an invalid lat parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lat');
            }
        });

        it('Invalid lon', () => {
            try {
                sun.sunset(year, month, day, lat, -300);
                throw 'Allowed an invalid lon parameter';
            } catch (err) {
                expect(err).toEqual('Invalid lon');
            }
        });

        it('Calculating Sunset', () => {
            let dayOfYear = sun.getDayOfYear(year, month, day);
            let utcOffset = sun.getLonUTCOffset(lon);
            let settingTime = sun.getSettingTime(lon, dayOfYear);
            let sunsMeanAnomaly = sun.getSunsMeanAnomaly(settingTime);
            let sunsTrueLon = sun.getSunsTrueLon(sunsMeanAnomaly);
            let sunsRightAscension = sun.getSunsRightAscension(sunsTrueLon);
            let sunsLocalHourAngle = sun.getSunsLocalHourAngle(sunsTrueLon, lat);
            let hours = ((180.0 / Math.PI) * Math.acos(sunsLocalHourAngle)) / 15;
            let localMeanTime = sun.getLocalMeanTime(hours, settingTime, sunsRightAscension);
            let time = sun.toUTC(localMeanTime, utcOffset);
            let response = sun.sunset(year, month, day, lat, lon);
            expect(response).toEqual(time);
        });

    });

});
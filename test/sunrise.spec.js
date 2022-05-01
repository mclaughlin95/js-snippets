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

    describe('validateDate()', () => {

        describe('Year parameter validation', () => {
            
            let errorMessage = 'Invalid year';

            it('Undefined year parameter', () => {
                try {
                    sunrise.validateDate();
                    throw 'Allowed undefined year parameter';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Invalid year parameter data type', () => {
                try {
                    sunrise.validateDate('foobar');
                    throw 'Allowed invalid year parameter data type';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Year must be greater than 0', () => {
                try {
                    sunrise.validateDate(0);
                    throw 'Allowed a year of 0 or less';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Year must be less than or equal to 9999', () => {
                try {
                    sunrise.validateDate(10000);
                    throw 'Allowed a year greater than 9999';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Year must be a whole number', () => {
                try {
                    sunrise.validateDate(20.22);
                    throw 'Allowed a non whole number year';
                } catch(err) {
                    expect(err).toEqual(errorMessage);
                }
            });

        });

        describe('Month parameter validation', () => {

            let errorMessage = 'Invalid month';
            let year = 2022;

            it('Undefined month parameter', () => {
                try {
                    sunrise.validateDate(year, undefined);
                    throw 'Allowed an undefined month';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Invalid month parameter data type', () => {
                try {
                    sunrise.validateDate(year, 'foobar');
                    throw 'Allowed an invalid month parameter data type';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Month must greater than 0', () => {
                try {
                    sunrise.validateDate(year, 0);
                    throw 'Allowed a month of 0 or less than 0';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Month must be less than or equal to 12', () => {
                try {
                    sunrise.validateDate(year, 13);
                    throw 'Allowed a month greater than 12';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Month must be a whole number', () => {
                try {
                    sunrise.validateDate(year, 5.5);
                    throw 'Allowed a non whole number month';
                } catch(err) {
                    expect(err).toEqual(errorMessage);
                }
            });
        });

        describe('Day parameter validation', () => {

            let errorMessage = 'Invalid day';
            let year = 2022;
            let month = 5;

            it('Undefined day parameter', () => {
                try {
                    sunrise.validateDate(year, month, undefined);
                    throw 'Allowed an undefined day';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Invalid day parameter data type', () => {
                try {
                    sunrise.validateDate(year, month, 'foobar');
                    throw 'Allowed invalid day parameter data type';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Day must be greater than 0', () => {
                try {
                    sunrise.validateDate(year, month, 0);
                    throw 'Allowed day to be less than or equal to 0';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Day must be less than or equal to 31', () => {
                try {
                    sunrise.validateDate(year, month, 32);
                    throw 'Allowed more than 31 days';
                } catch (err) {
                    expect(err).toEqual(errorMessage);
                }
            });

            it('Day must be a whole number', () => {
                try {
                    sunrise.validateDate(year, month, 5.5);
                    throw 'Allowed a non whole number day';
                } catch(err) {
                    expect(err).toEqual(errorMessage);
                }
            });

        });

    });



});
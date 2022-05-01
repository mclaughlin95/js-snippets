// Resources
// https://www.edwilliams.org/sunrise_sunset_algorithm.htm

let sunrise = (() => {

    /**
     * The number of days in each month of a common year
     * 
     * Type: Private Variable
     * 
     * Resource: https://www.timeanddate.com/calendar/months/
     * 
     * Author: Corey Lee McLaughlin
     */
     let monthDays = {
        1: 31, // January
        2: 28, // February
        3: 31, // March
        4: 30, // April
        5: 31, // May
        6: 30, // June
        7: 31, // July
        8: 31, // August
        9: 30, // September
        10: 31, // October
        11: 30, // November
        12: 31 // December
    };

    /**
     * A series of Sun's Zenith for sunrise/sunset
     * 
     * Type: Private Variable
     * 
     * Resource: https://www.edwilliams.org/sunrise_sunset_algorithm.htm
     * 
     * Author: Corey Lee McLaughlin
     */
     let observedZeniths = {
        official: 90.88, //90.88, 90.5, 90?
        civil: 96,
        natical: 102,
        astronomical: 108
    };

    /**
     * Sun's Zenith for sunrise/sunset
     * 
     * Type: Public Variable
     * 
     * Resource: https://www.edwilliams.org/sunrise_sunset_algorithm.htm
     * 
     * Author: Corey Lee McLaughlin
     */
    let zenith = observedZeniths.official;

    /**
     * Will provide the day of the year when given a specified date
     * 
     * Type: Public Function
     * 
     * Resource: https://www.edwilliams.org/sunrise_sunset_algorithm.htm
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} day 
     * @throws {String} will throw an error if supplied an invalid date
     * @returns {Number} the day of the year
     */
    function getDayOfYear(year, month, day) {
        if (!this.isValidDate(year, month, day)) {
            throw 'Invalid date';
        }
        let n1 = Math.floor(275 * month / 9);
        let n2 = Math.floor((month + 9) / 12);
        let n3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3))
        let n = n1 - (n2 * n3) + day -30;
        return n;
    }

    /**
     * Will return the number of days in a particular month while accounting for leap year
     * 
     * Type: Public Function
     * 
     * Resources: https://www.timeanddate.com/calendar/months/
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} month a one or two digit number representing a month
     * @param {Number} year a four digit number representing the year
     * @throws Will throw an error if supplied month is invalid
     * @throws Will throw an error if supplied year is invalid
     * @returns {Number} the number of days in the given month
     */
     function getMonthDays(month, year) {
        if (!this.isValidMonth(month)) {
            throw 'Invalid month';
        }
        if (!this.isValidYear(year)) {
            throw 'Invalid year';
        }
        if (this.isLeapYear(year) && month == 2) {
            return monthDays[2] + 1;
        }
        return monthDays[month];
    }

    /**
     * Will determine whether the year is a leap year
     * 
     * Type: Public Function
     * 
     * Resource: https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-6.php
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} year a four digit number representing the year
     * @throws Will throw an error if year is not valid. See isValidYear() for more information
     * @returns {Boolean}
     */
     function isLeapYear(year) {
        if (!this.isValidYear(year)) {
            throw 'Invalid year';
        }
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return true
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Will determine whether the supplied date is valid, while accounting for leap year 
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} year a four digit number representing the year
     * @param {Number} month a one or two digit number representing a month
     * @param {Number} day a one or two digit number representing the day
     * @returns {Boolean}
     */
     function isValidDate(year, month, day) {
        if (!this.isValidYear(year) || !this.isValidMonth(month) || !this.isValidDay(day)) {
            return false;
        }
        if (day > this.getMonthDays(month, year)) {
            return false;
        }
        return true;
    }   

    /**
     * Will determine whether the day is valid
     * 
     * Valid Days: A whole number ranging from 1 to 31
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} day a one or two digit number representing the day 
     * @returns {Boolean}
     */
     function isValidDay(day) {
        if (typeof day == 'number' && day > 0 && day < 32 && day % 1 == 0) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the latitude is valid
     * 
     * EPSG:4326
     * Valid Latitude: -90 to 90
     * 
     * Resource: https://epsg.io/4326
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} lat the latitude coordinate 
     * @returns {Boolean}
     */
    function isValidLat(lat) {
        if (typeof lat == 'number' && lat >= -90 && lat <= 90) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the longitude is valid
     * 
     * EPSG:4326
     * Valid Longitudes: -180 to 180
     * 
     * Resource: https://epsg.io/4326
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} lon the longitude cordinate 
     * @returns {Boolean}
     */
    function isValidLon(lon) {
        if (typeof lon == 'number' && lon >= -180 && lon <= 180) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the month is valid
     * 
     * Valid Months: A whole number ranging from 1 to 12
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} month a one or two digit number representing a month
     * @returns {Boolean}
     */
     function isValidMonth(month) {
        if (typeof month == 'number' && month > 0 && month < 13 && month % 1 == 0) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the year is valid.
     * 
     * Valid Years: A whole number ranging from 1 to 9999
     * 
     * Type: Public Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} year a four digit number representing the year
     * @returns {Boolean}
     */
    function isValidYear(year) {
        if (typeof year == 'number' && year > 0 && year < 10000 && year % 1 == 0) {
            return true;
        }
        return false;
    }

    return {
        getDayOfYear: getDayOfYear,
        getMonthDays: getMonthDays,
        isLeapYear: isLeapYear,
        isValidDate: isValidDate,
        isValidDay: isValidDay,
        isValidLat: isValidLat,
        isValidLon: isValidLon,
        isValidMonth: isValidMonth,
        isValidYear: isValidYear
    };

})();

export default sunrise;





// Return is in UTC Time!!!
// Function Pulled straight from make_global_qtdeg_sunrise_sunset_grids.c and converted to JavaScript
function calculateSunrise(yyyymmdd, lon, lat) {
    
    var zenith = 90.88;


    /////////////////////////////////////////////////////////////////////// calculate day of the year

    // // Convert String to numbers
    // var date = parseInt(yyyymmdd);
    // var lon = parseFloat(lon);
    // var lat = parseFloat(lat);

    // // Parse date
    // var day = date % 100;
    // var year = date / 10000;
    // var month = (date / 100) % 100;
    // var mmdd = (month * 100) + day;

    // day = Math.floor(day);
    // year = Math.floor(year);
    // month = Math.floor(month);
    // mmdd = Math.floor(mmdd);

    // // Calculate the day of the year
    // var n1 = Math.floor(275.0 * month / 9.0);
    // var n2 = Math.floor((month + 9.0) / 12.0);
    // var n3 = (1 + Math.floor((year - 4.0 * Math.floor(year / 4.0) + 2.0) / 3.0));
    // var n = n1 - (n2 * n3) + day - 30;


    // console.log('Day Of Year');
    // console.log(n)





    /////////////////////////////////////////////////////////////////////// not sure yet
    // Convert the longitude to hour value and calculate an approximate time
    var lnghour = lon / 15.0;










    /////////////////////////////////////////////////////////////////////// sunrise

    /////////////// Sunrise calculations //////////////////

    // if rising time is desired:
    var trising = n + ((6.0 - lnghour) / 24.0);

    var t = trising;

    // Calculate the Sun's mean anomaly
    var m = (0.9856 * t) - 3.289;

    // Calculate the Sun's true longitude
    var l = m + (1.916 * Math.sin((Math.PI / 180.0) * m)) + (0.020 * Math.sin(2.0 * (Math.PI / 180.0) * m)) + 282.634;
    if (l < 0.0) {
        l += 360.0;
    } else if (l >= 360.0) {
        l -= 360.0;
    }

    // Calculate the Sun's right ascension
    var ra = (180.0 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180.0) * l));

    // Right ascension value needs to be in the same quadrant as l
    var lquadrant = (Math.floor(l / 90.0)) * 90.0;
    var raquadrant = (Math.floor(ra / 90.0)) * 90.0;
    ra = ra + (lquadrant - raquadrant);

    // Right ascension value needs to be converted into hours
    ra /= 15.0;

    // Calculate the Sun's declination
    var sindec = 0.39782 * Math.sin((Math.PI / 180.0) * l);
    var cosdec = Math.cos(Math.asin(sindec));

    // Calculate the Sun's local hour angle
    var cosh = (Math.cos((Math.PI / 180.0) * zenith) - (sindec * Math.sin((Math.PI / 180.0) * lat))) / (cosdec * Math.cos((Math.PI / 180.0) * lat));

    // if (cosH >  1)
    //   the sun never rises on this location (on the specified date)
    // if (cosH < -1)
    //   the sun never sets on this location (on the specified date)

    // Finish calculating H and convert into hours
    // if rising time is desired:
    var h = 360.0 - (180.0 / Math.PI) * Math.acos(cosh);
    //   if setting time is desired:
    // h=(180.0/M_PI)*acos(cosh);

    h /= 15.0;

    // Calculate local mean time of rising/setting
    var t = h + ra - (0.06571 * t) - 6.622;

    // Adjust back to UTC
    var ut = t - lnghour;
    while (ut < 0.0) {
        ut += 24.0;
    }
    while (ut >= 24.0) {
        ut -= 24.0;
    }

    trising = ut;

 



    /////////////////////////////////////////////////////////////////////// sunset

    /////////////// Sunset calculations //////////////////


    // if setting time is desired:
    var tsetting = n + ((18.0 - lnghour) / 24.0);

    t = tsetting;

    // Calculate the Sun's mean anomaly
    m = (0.9856 * t) - 3.289;

    // Calculate the Sun's true longitude
    l = m + (1.916 * Math.sin((Math.PI / 180.0) * m)) + (0.020 * Math.sin(2.0 * (Math.PI / 180.0) * m)) + 282.634;
    if (l < 0.0) {
        l += 360.0;
    } else if (l >= 360.0) {
        l -= 360.0;
    }


    // Calculate the Sun's right ascension
    ra = (180.0 / Math.PI) * Math.atan(0.91764 * Math.tan((Math.PI / 180.0) * l));

    // Right ascension value needs to be in the same quadrant as l
    lquadrant = (Math.floor(l / 90.0)) * 90.0;
    raquadrant = (Math.floor(ra / 90.0)) * 90.0;
    ra = ra + (lquadrant - raquadrant);

    // Right ascension value needs to be converted into hours
    ra /= 15.0;

    // Calculate the Sun's declination
    sindec = 0.39782 * Math.sin((Math.PI / 180.0) * l);
    cosdec = Math.cos(Math.asin(sindec));

    // Calculate the Sun's local hour angle
    cosh = (Math.cos((Math.PI / 180.0) * zenith) - (sindec * Math.sin((Math.PI / 180.0) * lat))) / (cosdec * Math.cos((Math.PI / 180.0) * lat));

    // if (cosH >  1)
    //   the sun never rises on this location (on the specified date)
    // if (cosH < -1)
    //   the sun never sets on this location (on the specified date)

    // Finish calculating H and convert into hours
    // if rising time is desired:
    //   h=360.0-(180.0/M_PI)*acos(cosh);
    //   if setting time is desired:
    h = (180.0 / Math.PI) * Math.acos(cosh);

    h /= 15.0;

    // Calculate local mean time of rising/setting
    t = h + ra - (0.06571 * t) - 6.622;








    /////////////////////////////////////////////////////////////////////// UTC conversion

    // Adjust back to UTC
    ut = t - lnghour;
    while (ut < 0.0) {
        ut += 24.0;
    }
    while (ut >= 24.0) {
        ut -= 24.0;
    }

    tsetting = ut;

    if (isNaN(trising) || isNaN(tsetting)) {   // not sure what the logic might be. Outliers?
        if (lat > 0.0) {
            if ((mmdd > 321) && (mmdd <= 921)) {
                trising = 0.0;
                tsetting = 24.0;
            } else {
                trising = 0.0;
                tsetting = 0.0;
            }
        } else {
            if ((mmdd > 321) && (mmdd <= 921)) {
                trising = 0.0;
                tsetting = 0.0;
            } else {
                trising = 0.0;
                tsetting = 24.0;
            }
        }
    }

    var srise = parseFloat(trising);
    var sset = parseFloat(tsetting);
    var shours = parseFloat(tsetting - trising);
    while (shours < 0.0) {
        shours += 24.0;
    }
    while (shours > 24.0) {
        shours -= 24.0;
    }

    return { "rise": srise, "set": sset, "hours": shours, "date": yyyymmdd };
}

function convertHour(decimalHour) {
    let hour = Math.floor(parseFloat(decimalHour));
    let min = Math.floor((parseFloat(decimalHour) - hour)*60);
    
    if (hour < 10) {
        hour = "0"+hour;
    }
    if (min < 10) {
        min = "0"+min;
    }
    return hour+":"+min;
}
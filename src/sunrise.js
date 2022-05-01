// https://www.edwilliams.org/sunrise_sunset_algorithm.htm

let sunrise = (() => {

    /**
     * Will determine whether the year is valid.
     * 
     * Valid Years: A whole number ranging from 1 to 9999
     * 
     * Type: Function
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

    /**
     * Will determine whether the month is valid
     * 
     * Valid Months: A whole number ranging from 1 to 12
     * 
     * Type: Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} month a one or two digit number representing a month
     * @returns 
     */
    function isValidMonth(month) {
        if (typeof month == 'number' && month > 0 && month < 13 && month % 1 == 0) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the day is valid
     * 
     * Valid Days: A whole number ranging from 1 to 31
     * 
     * Type: Function
     * 
     * Author: Corey Lee McLaughlin
     * 
     * @param {Number} day a one or two digit number representing the day 
     * @returns 
     */
    function isValidDay(day) {
        if (typeof day == 'number' && day > 0 && day < 32 && day % 1 == 0) {
            return true;
        }
        return false;
    }

    /**
     * Will determine whether the year is a leap year
     * 
     * Type: Function
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
     * Will parse a date for the use of calculating sunrise and sunset values. 
     * 
     * Type: Function
     */
    function validateDate(year, month, day) {
        if (!this.isValidYear(year)) {
            throw 'Invalid year';
        }
        if (!this.isValidMonth(month)) {
            throw 'Invalid month';
        }
        if (!this.isValidDay(day)) {
            throw 'Invalid day';
        }
    }   

    return {
        isValidYear: isValidYear,
        isValidMonth: isValidMonth,
        isValidDay: isValidDay,
        isLeapYear: isLeapYear,
        validateDate: validateDate
    };

})();

export default sunrise;





// Return is in UTC Time!!!
// Function Pulled straight from make_global_qtdeg_sunrise_sunset_grids.c and converted to JavaScript
function calculateSunrise(yyyymmdd, lon, lat) {
    
    var zenith = 90.88;


    /////////////////////////////////////////////////////////////////////// calculate day of the year

    // Convert String to numbers
    var date = parseInt(yyyymmdd);
    var lon = parseFloat(lon);
    var lat = parseFloat(lat);

    // Parse date
    var day = date % 100;
    var year = date / 10000;
    var month = (date / 100) % 100;
    var mmdd = (month * 100) + day;

    day = Math.floor(day);
    year = Math.floor(year);
    month = Math.floor(month);
    mmdd = Math.floor(mmdd);

    // Calculate the day of the year
    var n1 = Math.floor(275.0 * month / 9.0);
    var n2 = Math.floor((month + 9.0) / 12.0);
    var n3 = (1 + Math.floor((year - 4.0 * Math.floor(year / 4.0) + 2.0) / 3.0));
    var n = n1 - (n2 * n3) + day - 30;


    console.log('Day Of Year');
    console.log(n)





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
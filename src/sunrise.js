// https://www.edwilliams.org/sunrise_sunset_algorithm.htm


// Return is in UTC Time!!!
// Function Pulled straight from make_global_qtdeg_sunrise_sunset_grids.c and converted to JavaScript
export function calculateSunrise(yyyymmdd, lon, lat) {
    
    var zenith = 90.88;

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

    // Convert the longitude to hour value and calculate an approximate time
    var lnghour = lon / 15.0;

    // if rising time is desired:
    var trising = n + ((6.0 - lnghour) / 24.0);

    // if setting time is desired:
    var tsetting = n + ((18.0 - lnghour) / 24.0);

    /////////////// Sunrise calculations //////////////////
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

    // $tsetting = $ut;

    // if( is_nan( $trising ) || is_nan( $tsetting ) ){
    // if( $lat > 0.0 ){
    // if( ( $mmdd > 321 ) && ( $mmdd <= 921 ) ){
    // $trising = 0.0;
    // $tsetting = 24.0;
    // } else {
    // $trising = 0.0;
    // $tsetting = 0.0;
    // }
    // } else {
    // if( ( mmdd > 321 ) && ( mmdd <= 921 ) ){
    // $trising = 0.0;
    // $tsetting = 0.0;
    // } else {
    // $trising = 0.0;
    // $tsetting = 24.0;
    // }
    // }
    // }

    // I was told these lines of code are for grids, which is not what we need - Corey McLaughlin
    // *srise=(float)trising;
    // *sset=(float)tsetting;
    // *shours=(float)(tsetting-trising);
    // while(*shours < 0.0)
    // *shours+=24.0;
    // while(*shours > 24.0)
    // *shours-=24.0;
    // }

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

    // Adjust back to UTC
    ut = t - lnghour;
    while (ut < 0.0) {
        ut += 24.0;
    }
    while (ut >= 24.0) {
        ut -= 24.0;
    }

    tsetting = ut;

    if (isNaN(trising) || isNaN(tsetting)) {
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
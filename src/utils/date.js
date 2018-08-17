exports.parseDate = ( str ) => {

  let strMatch = str.match(/(\d+)\/(\d+)/);

  if ( strMatch !== null ) {
    [month, day] = strMatch.slice(1, 3);
    return [month-1, day];
  }
  return strMatch;
}


exports.parseTime = ( str ) => {

  let strMatch = str.match(/(\d+):(\d+)\s?([A-Za-z]{0,2})/);

  if ( strMatch !== null ) {
    let [hour, min, am_pm] = strMatch.slice(1, 4);
    if ( am_pm === "pm" && hour < 12 ) hour = parseInt(hour) + 12;
    if ( am_pm === "am" && hour == 12 ) hour = 0;
    return [ hour, min ];
  }
  return strMatch;
}


exports.parseTimeZones = ( str ) => {

  let timezone = str.toUpperCase();

  let timezones = {
    PST: 8,
    PDT: 7,
    EST: 5,
    EDT: 4,
    CST: 6,
    CDT: 5,
    MST: 7,
    MDT: 6,
    HST: 10
  }

  return timezones[timezone];
}

exports.dateDiff = ( date1, date2 ) => {

  let start = date1.getTime();
  let end = date2.getTime();

  let minsDiff = Math.round(Math.abs(start-end)/(1000*60), 0);

  let numDays = Math.floor(minsDiff / ( 60 * 24));
  minsDiff -= numDays*(60*24);

  let numHours = Math.floor(minsDiff/60);
  minsDiff -= numHours*60;

  let numMins = minsDiff

  return [ numDays, numHours, numMins ];

}

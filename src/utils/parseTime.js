exports.run = ( str ) => {

  let strMatch = str.match(/(\d+):(\d+)\s?([A-Za-z]{0,2})/);

  if ( strMatch !== null ) {
    let [hour, min, am_pm] = strMatch.slice(1, 4);
    if ( am_pm === "pm" && hour < 12 ) hour = parseInt(hour) + 12;
    if ( am_pm === "am" && hour == 12 ) hour = 0;
    return [ hour, min ];
  }
  return strMatch;
}

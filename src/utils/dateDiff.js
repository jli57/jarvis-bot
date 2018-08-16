exports.run = ( date1, date2 ) => {

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

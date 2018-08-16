exports.run = ( str ) => {

  let strMatch = str.match(/(\d+)\/(\d+)/);

  if ( strMatch !== null ) {
    [month, day] = strMatch.slice(1, 3);
    return [month-1, day];
  }
  return strMatch; 
}

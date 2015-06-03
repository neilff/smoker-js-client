export function leftPad(number, targetLength) {
  var output = number + '';

  while (output.length < targetLength) {
   output = '0' + output;
  }

  return output;
}

export function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;

  var secs = s % 60;
  s = (s - secs) / 60;

  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return leftPad(hrs, 2) + ':' + leftPad(mins, 2) + ':' + leftPad(secs, 2);
}

export function timeToMs(time) {
  var minAsMs = time.min * 60000;
  var hrAsMs = time.hr * 3600000;
  return minAsMs + hrAsMs;
}

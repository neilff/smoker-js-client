import * as actions from '../actions/alarm-actions';

var clock = 0;
var offset = 0;
var alarm = null;
var interval = null;

function calcDelta() {
  var now = Date.now();
  var d = now - offset;
  offset = now;

  return d;
}

function alarmTick() {
  clock = clock + calcDelta();

  if (alarm && clock >= alarm) {
    stopAlarm();
    actions.onAlarmTick(clock);
    actions.onAlarmComplete();
  } else {
    actions.onAlarmTick(clock);
  }
}

export function startAlarm(alarmTime) {
  alarm = alarmTime;

  if (!interval) {
    offset = Date.now();
    interval = setInterval(alarmTick, 1000);
  }
}

export function stopAlarm() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

export function resetAlarm() {
  stopAlarm();

  clock = 0;
  offset = 0;
  alarm = null;
  interval = null;
}

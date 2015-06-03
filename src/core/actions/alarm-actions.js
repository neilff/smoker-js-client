import setToString from '../util/settostring';
import {dispatch} from '../dispatcher/dispatcher';
import * as timer from '../util/timer';

/**
 * Start alarm
 */
export function onAlarmStart(alarm) {
  timer.startAlarm(alarm);
  dispatch(onAlarmStart, alarm);
}

/**
 * Cancel alarm
 */
export function onAlarmReset() {
  timer.resetAlarm();
  dispatch(onAlarmReset, true);
}

/**
 * Stop alarm
 */
export function onAlarmStop() {
  timer.stopAlarm();
  dispatch(onAlarmStop, true);
}

/**
 * When clock ticks
 */
export function onAlarmTick(clock) {
  dispatch(onAlarmTick, clock);
}

/**
 * When the alarm is completed
 */
export function onAlarmComplete() {
  dispatch(onAlarmComplete, true);
}

setToString('temperature', {
  onAlarmStart,
  onAlarmReset,
  onAlarmStop,
  onAlarmComplete
});

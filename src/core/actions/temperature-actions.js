import setToString from '../util/settostring';
import {dispatch} from '../dispatcher/dispatcher';
import * as sockets from '../sockets/sockets';

/**
 * Initializes the temperature read from the websocket service
 */
export function onTemperatureReadStart() {
  sockets.init();
}

/**
 * Updates the temperature store when a new reading arrives in the application
 */
export function onTemperatureUpdated(tempReading) {
  dispatch(onTemperatureUpdated, tempReading);
}

/**
 * Sets the warning low temperature
 */
export function onSetLowTemp(temp) {
  dispatch(onSetLowTemp, temp);
}

/**
 * Sets the warning high temperature
 */
export function onSetHighTemp(temp) {
  dispatch(onSetHighTemp, temp);
}

/**
 * Toggles the temperature warning on / off
 */
export function onToggleTempWarning() {
  dispatch(onToggleTempWarning, null);
}

setToString('temperature', {
  onTemperatureUpdated,
  onTemperatureReadStart,
  onToggleTempWarning
});

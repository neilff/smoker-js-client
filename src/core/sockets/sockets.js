import io from 'socket.io-client';
import {onTemperatureUpdated} from '../actions/temperature-actions';

var socket = io('http://localhost:8080');

export function init() {
  socket.on('onTempUpdate', onTemperatureUpdated);
}

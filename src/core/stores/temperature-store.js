import * as actions from '../actions/temperature-actions';
import {Map} from 'immutable';
import EventEmitter from 'eventemitter3';
import {register} from '../dispatcher/dispatcher';
import assign from 'object-assign';

var _temperatureState = Map({
  tempK: 0,
  tempC: 0,
  tempF: 0,
  lowThreshold: 150,
  highThreshold: 300,
  alarmEnabled: false,
  lowAlarm: false,
  highAlarm: false
});

const CHANGE_EVENT = 'onTemperatureStoreChange';

var TemperatureStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _temperatureState;
  },

  isAlarmEnabled: function() {
    return _temperatureState.get('alarmEnabled');
  },

  isTooLow: function() {
    return _temperatureState.get('lowAlarm');
  },

  isTooHigh: function() {
    return _temperatureState.get('highAlarm');
  }
});

TemperatureStore.dispatchToken = register(({action, data}) => {

  switch (action) {

    /**
     * When temperature updates arrive in the application
     */
    case actions.onTemperatureUpdated:
      var isTooLow = data.tempF < _temperatureState.get('lowThreshold');
      var isTooHigh = data.tempF > _temperatureState.get('highThreshold');

      _temperatureState = _temperatureState.merge({
        tempK: data.tempK,
        tempC: data.tempC,
        tempF: data.tempF,
        lowAlarm: isTooLow,
        highAlarm: isTooHigh
      });

      TemperatureStore.emitChange();
      break;

    /**
     * When low temp is modified
     */
    case actions.onSetLowTemp:
      _temperatureState = _temperatureState.set('lowThreshold', data);

      TemperatureStore.emitChange();
      break;

    /**
     * When high temp is modified
     */
    case actions.onSetHighTemp:
      _temperatureState = _temperatureState.set('highThreshold', data);

      TemperatureStore.emitChange();
      break;

    /**
     * When temp warning is toggled
     */
    case actions.onToggleTempWarning:
      var currTempAlarm = _temperatureState.get('alarmEnabled');
      _temperatureState = _temperatureState.set('alarmEnabled', !currTempAlarm);

      TemperatureStore.emitChange();
      break;
  }
});

export default TemperatureStore;

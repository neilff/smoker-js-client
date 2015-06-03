import * as actions from '../actions/alarm-actions';
import {Map} from 'immutable';
import EventEmitter from 'eventemitter3';
import {register} from '../dispatcher/dispatcher';
import assign from 'object-assign';

var _state = Map({
  clock: null,
  alarm: null
});

const CHANGE_EVENT = 'onAlarmStoreChange';

var AlarmStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAlarm: function() {
    return _state;
  }
});

AlarmStore.dispatchToken = register(({action, data}) => {

  switch (action) {

    /**
     * When alarm is started, inform the app
     */
    case actions.onAlarmStart:
      _state = _state.set('alarm', data);

      AlarmStore.emitChange();
      break;

    /**
     * When alarm is reset, set the alarm to null
     */
    case actions.onAlarmReset:
      _state = _state.merge({
        clock: null,
        alarm: null
      });

      AlarmStore.emitChange();
      break;

    case actions.onAlarmTick:
      _state = _state.set('clock', data);

      AlarmStore.emitChange();
      break;

    case actions.onAlarmComplete:
      alert('time up');

      AlarmStore.emitChange();
      break;
  }
});

export default AlarmStore;

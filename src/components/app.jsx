import React from 'react';
import TemperatureStore from '../core/stores/temperature-store';
import AlarmStore from '../core/stores/alarm-store';
import TempDisplay from './temp-display/temp-display';
import AlarmClock from './alarm-clock/alarm-clock';
import {onTemperatureReadStart} from '../core/actions/temperature-actions';

onTemperatureReadStart();

function getStateFromStores() {
  return {
    tempReading: TemperatureStore.getAll(),
    alarmState: AlarmStore.getAlarm()
  };
}

var App = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TemperatureStore.addChangeListener(this._onChange);
    AlarmStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TemperatureStore.removeChangeListener(this._onChange);
    AlarmStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="app">
        <TempDisplay
          tempReading={ this.state.tempReading } />
        <AlarmClock
          alarmState={ this.state.alarmState } />
      </div>
    );
  }
});

export default App;

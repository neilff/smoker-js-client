import PureComponent from 'react-pure-render/component';
import React from 'react';
import * as actions from '../../core/actions/temperature-actions';

require('./_temp-display.scss');

export default class TempDisplay extends PureComponent {
  onLowTempChange(e) {
    actions.onSetLowTemp(parseInt(e.target.value));
  }

  onHighTempChange(e) {
    actions.onSetHighTemp(parseInt(e.target.value));
  }

  render() {
    var lowThresholdVal = this.props.tempReading.get('lowThreshold');
    var highThresholdVal = this.props.tempReading.get('highThreshold');
    var alarmEnabled = this.props.tempReading.get('alarmEnabled');
    var isTooLow = this.props.tempReading.get('lowAlarm');
    var isTooHigh = this.props.tempReading.get('highAlarm');

    var tooLowWarning = isTooLow && alarmEnabled ?
      <b>Too Low</b> : '';

    var tooHighWarning = isTooHigh && alarmEnabled ?
      <b>Too High</b> : '';

    return (
      <div className="temp-display container">
        <div className="row">
          <div>{ tooLowWarning }</div>
          <div>{ tooHighWarning }</div>
        </div>
        <div className="row">
          <p>Temperature Display</p>
          <div className="twelve">
            <input
              type="text"
              className="u-full-width"
              disabled="true"
              value={ 'Fahrenheit: ' + this.props.tempReading.get('tempF') } />

            <input
              type="text"
              className="u-full-width"
              disabled="true"
              value={ 'Celcius: ' + this.props.tempReading.get('tempC') } />
          </div>
        </div>

        <div className="row">
          <div className="twelve">
            <label>Low Alarm (F)</label>
            <input
              value={ lowThresholdVal }
              onChange={ this.onLowTempChange.bind(this) }
              type="number"
              className="u-full-width" />

            <label>High Alarm (F)</label>
            <input
              value={ highThresholdVal }
              onChange={ this.onHighTempChange.bind(this) }
              type="number"
              className="u-full-width" />

            <button
              onClick={ actions.onToggleTempWarning }>
              Toggle Temp Warning
            </button>
            ({ alarmEnabled.toString() })
          </div>
        </div>
      </div>
    );
  }
}

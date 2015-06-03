import PureComponent from 'react-pure-render/component';
import React from 'react';
import R from 'ramda';
import * as actions from '../../core/actions/alarm-actions';
import * as conversion from '../../core/util/conversion';

require('./_alarm-clock.scss');

export default class AlarmClock extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hr: 0,
      min: 0
    };
  }

  setAlarmTime() {
    var time = this.state;

    if (time.min <= 0 && time.hr <= 0) {
      return;
    }

    actions.onAlarmStart(conversion.timeToMs(time));
  }

  onHrChange(e) {
    var currentState = this.state;

    this.setState({
      hr: parseInt(e.target.value),
      min: currentState.min
    });
  }

  onMinChange(e) {
    var currentState = this.state;

    this.setState({
      min: parseInt(e.target.value),
      hr: currentState.hr
    });
  }

  buildHrs() {
    return R.map(num => {
      return (
        <option value={ num }>{ num } hours</option>
      );
    })(R.range(0, 24));
  }

  buildMinutes() {
    return R.map(num => {
      return (
        <option value={ num }>{ num } mins</option>
      );
    })(R.range(0, 60));
  }

  render() {
    var clock = this.props.alarmState.get('clock');
    var alarm = this.props.alarmState.get('alarm');
    var clockInTime = conversion.msToTime(clock);
    var alarmInTime = conversion.msToTime(alarm);
    var hrVal = this.state.hr;
    var minVal = this.state.min;

    return (
      <div className="alarm-clock container">
        <div className="row">
          <div className="twelve">
            <p>Alarm Clock</p>
            <ul>
              <li>{ clockInTime } ({ clock })</li>
              <li>{ alarmInTime } ({ alarm })</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="six">
            <select
              value={ hrVal }
              onChange={ this.onHrChange.bind(this) }
              className="u-full-width">
              { this.buildHrs() }
            </select>
          </div>
          <div className="six">
            <select
              value={ minVal }
              onChange={ this.onMinChange.bind(this) }
              className="u-full-width">
              { this.buildMinutes() }
            </select>
          </div>
        </div>
        <div className="row">
          <div className="four columns">
            <button
              className="u-full-width"
              onClick={ this.setAlarmTime.bind(this) }>Start</button>
          </div>
          <div className="four columns">
            <button
              className="u-full-width"
              onClick={ actions.onAlarmStop }>Stop</button>
          </div>
          <div className="four columns">
            <button
              className="u-full-width"
              onClick={ actions.onAlarmReset }>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

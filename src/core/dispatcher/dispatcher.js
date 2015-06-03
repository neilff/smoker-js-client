import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher;

export function register(callback) {
  return dispatcher.register(callback);
}

export function dispatch(action, data) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug('Action Fired :: ', action);
  }

  dispatcher.dispatch({action, data});
}

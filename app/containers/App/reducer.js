/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_DATA_EVENTS,

  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: fromJS({
    repositories: false,
  }),
});

function appReducer(state = initialState, action) {
  state.set('requestUrl', action.requestUrl);

  switch (action.type) {
    case LOAD_DATA_EVENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);

    case LOAD_DATA_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.events)
        .set('loading', false);
    case LOAD_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;

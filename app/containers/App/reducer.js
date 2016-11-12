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
  LOAD_DATA_EVENTS_UPCOMING,
  LOAD_DATA_EVENTS_PAST,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  data: fromJS({
    events: fromJS({
      past: false,
      upcoming: false
    })
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_DATA_EVENTS_UPCOMING:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'events', 'upcoming'], false);

    case LOAD_DATA_EVENTS_PAST:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['data', 'events', 'past'], false);

    case LOAD_DATA_SUCCESS:
      return state
        .setIn(['data', 'events', action.filter], action.events)
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

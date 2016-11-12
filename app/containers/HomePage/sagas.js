/**
 * Gets the data from the backend
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_DATA_EVENTS_PAST,
  LOAD_DATA_EVENTS_UPCOMING
} from 'containers/App/constants';
import { dataLoaded, dataLoadingError } from 'containers/App/actions';

import request from 'utils/request';

// Select request URL based on Node environment
function requestURL(filter) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://kevinw.de/jugger-friends/wp-json/jugger/events/' + filter;
  }

  return 'http://localhost/wordpress/jugger-events/wp-json/jugger/events/' + filter;
}

function mapData(data) {
  return data.map(function (currentItem) {
    // We map the API's object to our own list of properties so we can easily react on changes to the API
    return {
      dateTimeStart: currentItem.dateTimeStart,
      dateTimeEnd: currentItem.dateTimeEnd,
      description: currentItem.description,
      id: currentItem.id,
      link: currentItem.link,
      location: {
        address: currentItem.location.address,
        latitude: currentItem.location.latitude,
        longitude: currentItem.location.longitude
      },
      title: currentItem.title,
      type: currentItem.type
    };
  });
}

/**
 * Data request/response handler
 */
export function* getData(filter) {
  // Call our request helper (see 'utils/request')
  const upcomingEvents = yield call(request, requestURL(filter));

  if (!upcomingEvents.err) {
    let events = mapData(upcomingEvents.data);

    yield put(dataLoaded(events, filter));
  } else {
    yield put(dataLoadingError(upcomingEvents.err));
  }
}

/**
 * Watches for LOAD_DATA action and calls handler
 */
export function* getDataWatcher(type, filter) {
  while (yield take(type)) {
    yield call(getData.bind(null, filter));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* eventsPast(type, filter) {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDataWatcher.bind(null, LOAD_DATA_EVENTS_PAST, 'past'));

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* eventsUpcoming(type, filter) {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDataWatcher.bind(null, LOAD_DATA_EVENTS_UPCOMING, 'upcoming'));

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  eventsPast,
  eventsUpcoming
];

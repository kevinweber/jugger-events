/**
 * Gets the data from the backend
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_DATA_EVENTS } from 'containers/App/constants';
import { dataLoaded, dataLoadingError } from 'containers/App/actions';

import request from 'utils/request';

function getRequestURL() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://kevinw.de/jugger-friends/wp-json/jugger/events/upcoming';
  }

  return 'http://localhost/wordpress/jugger-events/wp-json/jugger/events/upcoming';
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
export function* getData() {
  // Select request URL based on Node environment
  const requestURL = getRequestURL();

  // Call our request helper (see 'utils/request')
  const dataSources = yield call(request, requestURL);

  if (!dataSources.err) {
    let events = mapData(dataSources.data);

    yield put(dataLoaded(events));
  } else {
    yield put(dataLoadingError(dataSources.err));
  }
}


/**
 * Watches for LOAD_DATA action and calls handler
 */
export function* getDataWatcher() {
  while (yield take(LOAD_DATA_EVENTS)) {
    yield call(getData);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* apiData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  apiData,
];

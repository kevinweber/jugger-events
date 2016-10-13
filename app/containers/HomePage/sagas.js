/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

function getRequestURL() {
  if (process.env.NODE_ENV === 'production') {
    return 'http://kevinw.de/jugger-friends/wp-json/wp/v2/jugger-event';
  }

  return 'http://localhost/wordpress/jugger-events/wp-json/wp/v2/jugger-event';
}

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  // Select request URL based on Node environment
  const requestURL = getRequestURL();

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    let events = repos.data.map(function (currentItem) {
      // We map the API's object to our own list of properties so we can easily react on changes to the API
      return {
        dateTimeStart: currentItem.meta_box.jugger_event_datetime_start,
        dateTimeEnd: currentItem.meta_box.jugger_event_datetime_end,
        description: currentItem.content.rendered,
        id: currentItem.id,
        link: currentItem.meta_box.jugger_event_event_link,
        location: {
          address: currentItem.meta_box.jugger_event_address,
          latitude: currentItem.meta_box.map.latitude,
          longitude: currentItem.meta_box.map.longitude
        },
        title: currentItem.title.rendered,
        type: currentItem.meta_box.jugger_event_type
      };
    });

    yield put(reposLoaded(events, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}


/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  while (yield take(LOAD_REPOS)) {
    yield call(getRepos);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReposWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];

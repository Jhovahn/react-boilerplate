/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_USER_INPUT_PENDING } from 'containers/App/constants';
import {
  reposLoaded,
  repoLoadingError,
  loadUserInputPending,
  loadUserInputSuccess,
  loadUserInputError,
} from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectUsername,
  makeSelectInput,
} from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* writeUserInput() {
  const input = yield select(makeSelectInput());
  const url = `http://localhost:5000/input`;

  try {
    const formattedInput = JSON.stringify({ input: input });
    const entry = yield call(request, url, {
      method: 'POST',
      body: formattedInput,
    });
    yield put(loadUserInputSuccess(entry));
  } catch (err) {
    yield put(loadUserInputError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_REPOS, getRepos),
    takeLatest(LOAD_USER_INPUT_PENDING, writeUserInput),
  ]);
}

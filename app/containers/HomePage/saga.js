/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_USER_INPUT_PENDING,
  LOAD_DATABASE_PENDING,
} from 'containers/App/constants';
import {
  loadUserInputSuccess,
  loadUserInputError,
  loadDatabaseSuccess,
  loadDatabaseError,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectInput } from 'containers/HomePage/selectors';

export function* readDatabase() {
  const url = `http://localhost:5000/input`;

  try {
    const query = yield call(request, url, { method: 'GET' });
    yield put(loadDatabaseSuccess(query));
  } catch (err) {
    yield put(loadDatabaseError(err));
  }
}

export function* writeUserInput() {
  const input = yield select(makeSelectInput());
  const url = `http://localhost:5000/input`;

  try {
    const formattedInput = JSON.stringify({ input });
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
export default function* rootSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_USER_INPUT_PENDING, writeUserInput),
    takeLatest(LOAD_DATABASE_PENDING, readDatabase),
  ]);
}

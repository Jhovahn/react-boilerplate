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

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_USER_INPUT_PENDING,
  LOAD_USER_INPUT_SUCCESS,
  LOAD_USER_INPUT_ERROR,
  LOAD_DATABASE_PENDING,
  LOAD_DATABASE_SUCCESS,
  LOAD_DATABASE_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  userInputWritePending: false,
  userInputWriteSuccess: false,
  userInputWriteError: false,
  loadDatabaseReadPending: false,
  loadDatabaseReadSuccess: false,
  loadDatabaseReadError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_USER_INPUT_PENDING:
      return state.set('userInputWritePending', true);
    case LOAD_USER_INPUT_SUCCESS:
      return state
        .set('userInputWritePending', false)
        .set('userInputWriteSuccess', true);
    case LOAD_USER_INPUT_ERROR:
      return state
        .set('userInputWritePending', false)
        .set('userInputWriteError', true);
    case LOAD_DATABASE_PENDING:
      return state
        .set('loadDatabaseReadPending', true)
        .set('loadDatabaseReadSuccess', action.response);
    case LOAD_DATABASE_SUCCESS:
      return state
        .set('loadDatabaseReadPending', false)
        .set('loadDatabaseReadSuccess', action.response);
    case LOAD_DATABASE_ERROR:
      return state
        .set('loadDatabaseReadPending', false)
        .set('loadDatabaseReadError', action.response);
    default:
      return state;
  }
}

export default appReducer;

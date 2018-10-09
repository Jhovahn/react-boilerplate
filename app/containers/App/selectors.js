/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectLoadReadDatabasePending = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('loadDatabaseReadPending'),
  );
const makeSelectLoadReadDatabaseSuccess = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('loadDatabaseReadSuccess'),
  );
const makeSelectLoadReadDatabaseError = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('loadDatabaseReadError'),
  );

const makeSelectLoadWriteUserInputPending = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('userInputWritePending'),
  );

const makeSelectLoadWriteUserInputSuccess = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('userInputWriteSuccess'),
  );

const makeSelectLoadWriteUserInputError = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('userInputWriteError'),
  );

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectLoadWriteUserInputPending,
  makeSelectLoadWriteUserInputSuccess,
  makeSelectLoadWriteUserInputError,
  makeSelectLoadReadDatabasePending,
  makeSelectLoadReadDatabaseSuccess,
  makeSelectLoadReadDatabaseError,
};

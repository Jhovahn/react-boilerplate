/*
 * HomeReducer
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

import { CHANGE_USERNAME, CHANGE_USER_INPUT } from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  input: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_INPUT:
      return state.set('input', action.input);
    default:
      return state;
  }
}

export default homeReducer;

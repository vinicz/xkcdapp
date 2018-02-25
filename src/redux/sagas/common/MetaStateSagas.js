import { createActions, handleActions } from 'redux-actions';

export const START_REFRESHING = 'START_REFRESHING';
export const STOP_REFRESHING = 'STOP_REFRESHING';

export const actions = createActions({
  [START_REFRESHING]: () => null,
  [STOP_REFRESHING]: () => null,
});

const defaultState = { refreshing: false };

export const reducers = handleActions({
  [START_REFRESHING]: state => ({ ...state, refreshing: true }),
  [STOP_REFRESHING]: state => ({ ...state, refreshing: false }),
}, defaultState);


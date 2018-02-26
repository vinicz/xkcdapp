import { createActions, handleActions } from 'redux-actions';

export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const actions = createActions({
  [SHOW_ERROR]: errorMessage => errorMessage,
  [CLEAR_ERROR]: () => null,
});

const defaultState = { errorMessage: '' };

export const reducers = handleActions({
  [SHOW_ERROR]: (state, { payload: errorMessage }) => ({ ...state, errorMessage }),
  [CLEAR_ERROR]: state => ({ ...state, errorMessage: '' }),
}, defaultState);


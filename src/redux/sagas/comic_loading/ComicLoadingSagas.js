import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { createActions, handleActions } from 'redux-actions';
import { actions as metaStateActions } from '../common/MetaStateSagas';
import { ComicApi } from '../../../api/ComicApi';

const getLastLoadedComicId = state => state.comics.lastLoadedComicId;
const getComicList = state => state.comics.comicList;

const PAGE_SIZE = '10';
const MAX_LOADED_COMIC = '50';

export const REFRESH_COMIC_LIST = 'REFRESH_COMIC_LIST';
export const LOAD_NEXT_COMIC_LIST = 'LOAD_NEXT_COMIC_LIST';
export const SET_LAST_LOADED_COMIC_ID = 'SET_LAST_LOADED_COMIC_ID';
export const ADD_TO_COMIC_LIST = 'ADD_TO_COMIC_LIST';
export const CLEAR_COMIC_LIST = 'CLEAR_COMIC_LIST';


export const actions = createActions({
  [LOAD_NEXT_COMIC_LIST]: () => null,
  [REFRESH_COMIC_LIST]: () => null,
  [CLEAR_COMIC_LIST]: () => null,
  [SET_LAST_LOADED_COMIC_ID]: latestComicId => latestComicId,
  [ADD_TO_COMIC_LIST]: comicList => comicList,
});

const defaultState = { comicList: [], meta: { refreshing: false } };

export const reducers = handleActions({
  [SET_LAST_LOADED_COMIC_ID]: (state, action) => ({ ...state, lastLoadedComicId: action.payload }),
  [ADD_TO_COMIC_LIST]: (state, { payload: comicList }) => ({ ...state, comicList: [...state.comicList, ...comicList] }),
  [CLEAR_COMIC_LIST]: () => defaultState,
}, defaultState);

export function* loadLatestComicAndGetItsId(newComics) {
  const latestComic = yield call([ComicApi, ComicApi.fetchComic]);
  newComics.push(latestComic);
  return latestComic.num;
}

function* loadNextComicsSaga() {
  yield put(metaStateActions.startRefreshing());
  let lastLoadedComicId = yield select(getLastLoadedComicId);
  const newComics = [];
  let pageSize = PAGE_SIZE;

  if (!lastLoadedComicId) {
    pageSize -= 1;
    lastLoadedComicId = yield call(loadLatestComicAndGetItsId, newComics);
  }

  for (let i = lastLoadedComicId - 1; i >= lastLoadedComicId - pageSize; i--) {
    newComics.push(yield call([ComicApi, ComicApi.fetchComic], i));
  }

  yield put(actions.addToComicList(newComics));
  yield put(actions.setLastLoadedComicId(newComics[newComics.length - 1].num));
  yield put(metaStateActions.stopRefreshing());
}

export function* loadNextComicsIfUnderLimitSaga() {
  // debounce double loading
  yield call(delay, 500);
  const comicList = yield select(getComicList);

  if (comicList.length < MAX_LOADED_COMIC) {
    yield call(loadNextComicsSaga);
  }
}


export function* refreshComicsSaga() {
  yield put(actions.clearComicList());
  yield call(loadNextComicsIfUnderLimitSaga);
}

export function* sagas() {
  yield takeLatest(REFRESH_COMIC_LIST, refreshComicsSaga);
  yield takeLatest(LOAD_NEXT_COMIC_LIST, loadNextComicsIfUnderLimitSaga);
}

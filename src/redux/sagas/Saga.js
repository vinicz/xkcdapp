import { all, fork } from 'redux-saga/effects';
import { sagas as loadComicSagas } from './comic_loading/ComicLoadingSagas';

export default function* rootSaga() {
  yield all([
    fork(loadComicSagas),
  ]);
}

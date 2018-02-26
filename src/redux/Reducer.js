import { combineReducers } from 'redux';
import { reducers as comicLoadingReducersReducers } from './sagas/comic_loading/ComicLoadingSagas';
import { reducers as metaStateReducers } from './sagas/common/MetaStateSagas';
import { reducers as errorReducers } from './sagas/common/ErrorHandlingSagas';

const reducers = combineReducers({
  comics: comicLoadingReducersReducers,
  meta: metaStateReducers,
  error: errorReducers,
});

export default reducers;

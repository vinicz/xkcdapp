import { combineReducers } from 'redux';
import { reducers as comicLoadingReducersReducers } from './sagas/comic_loading/ComicLoadingSagas';
import { reducers as metaStateReducers } from './sagas/common/MetaStateSagas';

const reducers = combineReducers({
  comics: comicLoadingReducersReducers,
  meta: metaStateReducers,
});

export default reducers;

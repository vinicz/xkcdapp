import { combineReducers } from 'redux';
import { reducers as comicLoadingReducersReducers } from './sagas/comic_loading/ComicLoadingSagas';


const reducers = combineReducers({
    comics: comicLoadingReducersReducers,
});

export default reducers;
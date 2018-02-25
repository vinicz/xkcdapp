import { delay } from 'redux-saga'
import { put,call, takeEvery } from 'redux-saga/effects'
import { createActions, handleActions } from 'redux-actions';



export const LOAD_LATEST_COMIC = 'LOAD_LATEST_COMIC';
export const SET_LATEST_COMIC = 'SET_LATEST_COMIC';


export const actions = createActions({
    [LOAD_LATEST_COMIC]: () => null,
    [SET_LATEST_COMIC]: (latestComic) => latestComic,
});

export const reducers = handleActions({
    [SET_LATEST_COMIC]: (state,action) => {
        console.log("SET_LATEST_COMIC "+JSON.stringify(action))
        return {...state,latestComic: action.payload}},
}, {latestComic : {}});


export function* loadLatestComicSaga() {
    console.log("loadLatestComicSaga")
    let latestComic = yield call(fetchLatestComic);
    yield put(actions.setLatestComic(latestComic));
}

async function fetchLatestComic(){
    try {
        console.log("Fetching newest comic")

        let response = await fetch(
            'https://xkcd.com/1470/info.0.json'
        );

        console.log("Fetched newest comic "+JSON.stringify(response))
        let responseJson = await response.json();


        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* sagas() {
    yield takeEvery(LOAD_LATEST_COMIC, loadLatestComicSaga)
}
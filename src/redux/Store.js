import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas/Saga'
import reducer from './Reducer'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    {},
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

export default store;
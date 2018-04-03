import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import rootSaga from './saga';
import reducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
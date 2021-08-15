import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';

export default function configureStore(initialState) {
    // add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState,
         composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}
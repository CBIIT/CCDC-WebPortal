import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import datasets from './searchReducer';
import documentSearch from './documentSearchReducer';
import application from './applicationReducer';

const rootReducer = combineReducers({
    participatingResources,
    datasets,
    documentSearch,
    application,
});

export default rootReducer;

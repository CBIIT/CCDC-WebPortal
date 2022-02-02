import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';
import advancedSearch from './advancedFiltersReducer';
import datasets from './searchReducer';
import documentSearch from './documentSearchReducer';
import application from './applicationReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
    advancedSearch,
    datasets,
    documentSearch,
    application,
});

export default rootReducer;

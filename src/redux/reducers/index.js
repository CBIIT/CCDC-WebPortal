import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';
import advancedSearch from './advancedFiltersReducer';
import datasets from './searchReducer';
import documentSearch from './documentSearchReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
    advancedSearch,
    datasets,
    documentSearch,
});

export default rootReducer;

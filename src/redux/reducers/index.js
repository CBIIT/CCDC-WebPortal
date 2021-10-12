import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';
import advancedSearch from './advancedFiltersReducer';
import datasets from './searchReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
    advancedSearch,
    datasets,
});

export default rootReducer;

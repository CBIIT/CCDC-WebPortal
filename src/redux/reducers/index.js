import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';
import advancedFilters from './advancedFiltersReducer';
import datasets from './searchReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
    advancedFilters,
    datasets,
});

export default rootReducer;

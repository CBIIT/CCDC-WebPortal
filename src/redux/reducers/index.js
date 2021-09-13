import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';
import datasets from './searchReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
    datasets,
});

export default rootReducer;

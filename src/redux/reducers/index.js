import { combineReducers } from 'redux';
import participatingResources from './participatingResourcesReducer';
import searchFilters from './searchFiltersReducer';

const rootReducer = combineReducers({
    participatingResources,
    searchFilters,
});

export default rootReducer;

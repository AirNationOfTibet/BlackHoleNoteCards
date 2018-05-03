import { combineReducers } from 'redux';

const collectionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COLLECTION':
        //action.payload is the shelf items from the database
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    collectionReducer,
  });
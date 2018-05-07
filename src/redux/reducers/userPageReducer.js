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

const deckbuilderReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_NOTECARD_BUILD':
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    collectionReducer,
    deckbuilderReducer
  });
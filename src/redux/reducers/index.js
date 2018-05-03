import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import collectionView from './userPageReducer.js'


const store = combineReducers({
  user,
  login,
  collectionView
});

export default store;

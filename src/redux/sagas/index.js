import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import collectionSaga from './userPageSaga';
import deckbuildSaga from './deckbuilderSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    collectionSaga(),
    deckbuildSaga(),
    // watchIncrementAsync()
  ]);
}

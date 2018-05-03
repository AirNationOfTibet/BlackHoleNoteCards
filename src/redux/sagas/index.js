import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import collectionSaga from './userPageSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    collectionSaga(),
    // watchIncrementAsync()
  ]);
}

import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collectionSaga(){
    yield takeEvery('FETCH_COLLECTION', getCollectionSaga);
}

function* getCollectionSaga(action){
    try{
        const collectionResponse = yield call(axios.get, '/api/collection')
        yield put({
            type:'SET_COLLECTION',
            payload: collectionResponse.data,
        })
    } catch(error){
        console.log('error in getting collection', error);
    }
}

export default collectionSaga;
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collectionSaga(){
    yield takeEvery('FETCH_COLLECTION', getCollectionSaga);
    yield takeEvery('POST_COLLECTION', postCollectionSaga);
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

function* postCollectionSaga(action){
    try{
        console.log('actionpayload is this', action.payload);
        yield call(axios.post, '/api/collection', action.payload)
        yield put({
            type: 'FETCH_COLLECTION'
        })
    } catch (error){
        console.log(`WE AIN'T HAD NOTHING BUT MAGGOTY ERRORS FOR 3 STANKIN DAYS: `, error);
    }
}

export default collectionSaga;
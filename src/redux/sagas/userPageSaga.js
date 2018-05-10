import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collectionSaga(){
    yield takeEvery('FETCH_COLLECTION', getCollectionSaga);
    yield takeEvery('POST_COLLECTION', postCollectionSaga);
    yield takeEvery('DELETE_COLLECTION', deleteCollectionSaga);
}

function* deleteCollectionSaga(action){
    try{   
        console.log('hello this is what i should want', action.payload.item)
        yield call(axios.delete, `/api/collection/${action.payload.item.id}`)
        //uploads DOM with the requested item deleted via action.type 'FETCH_SHELF'
        yield put({
            type: 'FETCH_COLLECTION'
        })
    }catch (error){
        console.log('ERROR IN DELETE SAGA: ', error)
    }
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
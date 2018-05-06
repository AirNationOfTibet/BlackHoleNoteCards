import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deckbuildSaga(){
    yield takeEvery('SET_DECKBUILDER_COLLECTION', getNotecardSaga);
}

function* getNotecardSaga(action){
    try{
        const notecardResponse = yield call(axios.get, `/api/notecard/${action.payload.id}`)
        // yield put({
        //     type:'',
        //     payload: notecardResponse.data,
        // })
    } catch(error){
        console.log('error in getting notecard', error);
    }
}

export default deckbuildSaga;

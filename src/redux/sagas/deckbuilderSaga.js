import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deckbuildSaga(){
    yield takeEvery('SET_DECKBUILDER_COLLECTION', getNotecardSaga);
    yield takeEvery('DELETE_NOTECARD', deleteNotecardSaga);
    yield takeEvery('ADD_NOTECARD', addNotecardSaga);
}

function* addNotecardSaga(action){
    try{
        console.log('add action paylaod is ', action.payload);
        yield call(axios.post, '/api/notecard', action.payload)
        yield put({
            type: 'SET_DECKBUILDER_COLLECTION',
            payload: action.payload
        })
    } catch (error) {
        console.log('add saga error ',  error);
    }
}

function* deleteNotecardSaga(action){
    try{   
        console.log('hello this is what i should want', action.payload.notecard)
        yield call(axios.delete, `/api/notecard/${action.payload.notecard.id}`)
        //uploads DOM with the requested item deleted via action.type 'FETCH_SHELF'
        yield put({
            type: 'SET_DECKBUILDER_COLLECTION',
            payload: action.payload.notecard
        })
    }catch (error){
        console.log('ERROR IN DELETE SAGA: ', error)
    }
}

function* getNotecardSaga(action){
    try{
        const notecardResponse = yield call(axios.get, `/api/notecard/${action.payload.collection}`)
        console.log('this is the action payload', action.payload);
        yield put({
            type:'SET_NOTECARD_BUILD',
            payload: notecardResponse.data,
        })
    } catch(error){
        console.log('error in getting notecard', error);
    }
}

export default deckbuildSaga;

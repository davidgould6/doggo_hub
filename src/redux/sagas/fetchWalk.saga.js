import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchWalk function will send get request to walk router.
function* fetchWalk() {
    // console.log('in fetchWalks Saga');
    const response = yield axios.get('/api/walk');
    // console.log('FETCHWALK', response);
    yield put ({ type: 'SET_WALKS', payload: response.data});
}

function* fetchWalkSaga() {
  yield takeLatest('FETCH_WALK', fetchWalk);
}

export default fetchWalkSaga;
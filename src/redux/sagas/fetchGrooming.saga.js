import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchPets function will send get request to pet router.
function* fetchGrooming() {
    // console.log('in fetchPets Saga');
    const response = yield axios.get('/api/grooming');
    // console.log('this is response from server', response);
    yield put({type: 'SET_GROOMING', payload: response.data});
}

function* fetchGroomingSaga() {
  yield takeLatest('FETCH_GROOMING', fetchGrooming);
}

export default fetchGroomingSaga;
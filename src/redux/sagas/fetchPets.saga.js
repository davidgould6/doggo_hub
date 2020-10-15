import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchPets function will send get request to pet router.
function* fetchPets() {
    // console.log('in fetchPets Saga');
    const response = yield axios.get('/api/pet');
    // console.log('this is response from server', response);
    yield put({type: 'SET_PETS',payload: response.data});
}

function* fetchPetsSaga() {
  yield takeLatest('FETCH_PETS', fetchPets);
}

export default fetchPetsSaga;
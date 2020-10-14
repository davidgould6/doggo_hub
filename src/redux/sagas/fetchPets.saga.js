import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* fetchPets() {
    console.log('in fetchPets Saga');
    let response = yield axios({
        method: 'GET',
        url: '/api/pet',
    });
    console.log('this is response from server', response);

    // yield put({
    //   type: 'SET_PETS',
    //   payload: response.data
    // });
}

function* fetchPetsSaga() {
  yield takeLatest('FETCH_PETS', fetchPets);
}

export default fetchPetsSaga;
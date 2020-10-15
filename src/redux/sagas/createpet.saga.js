import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* createPet(action) {
    // console.log('in createPet, this is our payload', action.payload);
    yield axios.post('/api/pet', action.payload);
    // console.log('this is response from server', response);
    yield put({type: 'FETCH_PETS'});
}

function* createPetSaga() {
  yield takeLatest('CREATE_PET', createPet);
}

export default createPetSaga;
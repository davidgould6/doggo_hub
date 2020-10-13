import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* createPet(action) {
    console.log('in createPet, this is our payload', action.payload);
    let response = yield axios({
        method: 'POST',
        url: '/api/pet',
        data: action.payload
    });
    console.log('this is response from server', response);
}

function* createPetSaga() {
  yield takeLatest('CREATE_PET', createPet);
}

export default createPetSaga;
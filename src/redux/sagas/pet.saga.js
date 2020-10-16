import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* createPet(action) {
  // console.log('in createPet, this is our payload', action.payload);
  yield axios.post('/api/pet', action.payload);
  // console.log('this is response from server', response);
  yield put({type: 'FETCH_PETS'});
}

// fetchPets function will send get request to pet router.
function* fetchPets() {
  // console.log('in fetchPets Saga');
  const response = yield axios.get('/api/pet');
  // console.log('this is response from server', response);
  yield put({type: 'SET_PETS', payload: response.data});
}

function* petSaga() {
  yield takeLatest('CREATE_PET', createPet);
  yield takeLatest('FETCH_PETS', fetchPets);
}

export default petSaga;
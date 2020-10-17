import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* createPet(action) {
  // console.log('in createPet, this is our payload', action.payload);
  yield axios.post('/api/pet', action.payload);
  // console.log('this is response from server', response);
  yield put({type: 'FETCH_PETS'});
}

function* deletePet(action) {
  // console.log('in deletePet, this is our payload', action.payload);
  yield axios.delete(`/api/pet/${action.payload}`);
  yield put({type: 'FETCH_PETS'});
}

// fetchPets function will send get request to pet router.
function* fetchPets() {
  // console.log('in fetchPets Saga');
  const response = yield axios.get('/api/pet');
  // console.log('this is response from server', response);
  yield put({type: 'SET_PETS', payload: response.data});
}

// updatePet function will send a put request to pet router.
function* updatePet(action) {
  console.log('in pet saga updatepet function this is our action.payload', action.payload);
  const id = action.payload.id;
  const petInfoToUpdate = {
    petName: action.payload.petName,
    age: action.payload.age,
    size: action.payload.size,
  }
  yield axios.put(`/api/pet/${id}`, petInfoToUpdate);
  yield put({type: 'FETCH_PETS'});
}

function* petSaga() {
  yield takeLatest('CREATE_PET', createPet);
  yield takeLatest('DELETE_PET', deletePet);
  yield takeLatest('FETCH_PETS', fetchPets);
  yield takeLatest('UPDATE_PET', updatePet);
}

export default petSaga;
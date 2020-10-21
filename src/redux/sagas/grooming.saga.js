import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createGrooming function will send post request to grooming router.
function* createGrooming(action) {
  // console.log('in createGrooming, this is our payload', action.payload);
  yield axios.post('/api/grooming', action.payload);
  yield put({type: 'FETCH_GROOMING'});
}

// deleteGrooming function will send delete request to pet router.
function* deleteGrooming(action) {
  // console.log('in deleteGrooming, this is our payload', action.payload);
  yield axios.delete(`/api/grooming/${action.payload}`);
  // console.log('this is response from server', response);
  yield put({type: 'FETCH_GROOMING'});
}

// fetchGrooming function will send get request to pet router.
function* fetchGrooming() {
    // console.log('in fetchPets Saga');
    const response = yield axios.get('/api/grooming');
    // console.log('this is response from server', response);
    yield put({type: 'SET_GROOMING', payload: response.data});
}

// updateGrooming function will send put request to pet router.
function* updateGrooming(action) {
  // console.log('in updateGrooming, this is our payload', action.payload);
  const id = action.payload.id;
  const date = {date: action.payload.date}
  yield axios.put(`/api/grooming/${id}`, date);
  yield put({type: 'FETCH_GROOMING'});
}

function* groomingSaga() {
  yield takeLatest('CREATE_GROOMING', createGrooming);
  yield takeLatest('DELETE_GROOMING', deleteGrooming);
  yield takeLatest('FETCH_GROOMING', fetchGrooming);
  yield takeLatest('UPDATE_GROOMING', updateGrooming);
}

export default groomingSaga;
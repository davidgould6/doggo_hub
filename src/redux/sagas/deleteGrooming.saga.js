import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// deleteGrooming function will send delete request to pet router.
function* deleteGrooming(action) {
    console.log('in deleteGrooming, this is our payload', action.payload);
    let response = yield axios.delete(`/api/grooming/${action.payload}`);
    console.log('this is response from server', response);
    yield put({type: 'FETCH_GROOMING'});
}

function* deleteGroomingSaga() {
  yield takeLatest('DELETE_GROOMING', deleteGrooming);
}

export default deleteGroomingSaga;
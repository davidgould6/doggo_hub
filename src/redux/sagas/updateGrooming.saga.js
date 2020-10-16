import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// updateGrooming function will send put request to pet router.
function* updateGrooming(action) {
    console.log('in updateGrooming, this is our payload', action.payload);
    const id = action.payload.id;
    const date = {date: action.payload.date}
    yield axios.put(`/api/grooming/${id}`, date);
    yield put({type: 'FETCH_GROOMING'});
}

function* updateGroomingSaga() {
  yield takeLatest('UPDATE_GROOMING', updateGrooming);
}

export default updateGroomingSaga;
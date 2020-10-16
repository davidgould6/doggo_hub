import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createGrooming function will send post request to grooming router.
function* createGrooming(action) {
    // console.log('in createGrooming, this is our payload', action.payload);
    yield axios.post('/api/grooming', action.payload);

    yield put({type: 'FETCH_GROOMING'});
}

function* createGroomingSaga() {
  yield takeLatest('CREATE_GROOMING', createGrooming);
}

export default createGroomingSaga;
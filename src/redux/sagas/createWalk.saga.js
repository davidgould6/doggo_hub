import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* createWalk(action) {
    // console.log('in createWalk, this is our payload', action.payload);
    yield axios.post('/api/walk', action.payload);
    // console.log('this is response from server', response);
    yield put({ type: 'FETCH_WALK'});
}

function* createWalkSaga() {
  yield takeLatest('CREATE_WALK', createWalk);
}

export default createWalkSaga;
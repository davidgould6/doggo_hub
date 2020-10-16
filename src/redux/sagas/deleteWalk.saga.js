import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// deleteWalk function will send delete request to pet router.
function* deleteWalk(action) {
    console.log('in deleteWalk, this is our payload', action.payload);
    let response = yield axios.delete(`/api/walk/${action.payload}`);
    console.log('this is response from server', response);
    yield put({type: 'FETCH_WALK'});
}

function* deleteWalkSaga() {
  yield takeLatest('DELETE_WALK', deleteWalk);
}

export default deleteWalkSaga;
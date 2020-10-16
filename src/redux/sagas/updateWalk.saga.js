import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// updateWalk function will send put request to pet router.
function* updateWalk(action) {
    console.log('in updateWalk, this is our payload', action.payload);
    const id = action.payload.id;
    const date = {date: action.payload.date}

    yield axios.put(`/api/walk/${id}`, date);

    yield put({type: 'FETCH_WALK'});
}

function* updateWalkSaga() {
  yield takeLatest('UPDATE_WALK', updateWalk);
}

export default updateWalkSaga;
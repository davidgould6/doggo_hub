import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createWalk function will send post request to pet router.
function* createWalk(action) {
  // console.log('in createWalk, this is our payload', action.payload);
  yield axios.post('/api/walk', action.payload);
  // console.log('this is response from server', response);
  yield put({ type: 'FETCH_WALK'});
}

// deleteWalk function will send delete request to pet router.
function* deleteWalk(action) {
  // console.log('in deleteWalk, this is our payload', action.payload);
  let response = yield axios.delete(`/api/walk/${action.payload}`);
  // console.log('this is response from server', response);
  yield put({type: 'FETCH_WALK'});
}

// fetchWalk function will send get request to walk router.
function* fetchWalk() {
  // console.log('in fetchWalks Saga');
  const response = yield axios.get('/api/walk');
  // console.log('FETCHWALK', response);
  yield put ({ type: 'SET_WALKS', payload: response.data});
}

// updateWalk function will send put request to pet router.
function* updateWalk(action) {
  // console.log('in updateWalk, this is our payload', action.payload);
  const id = action.payload.id;
  const date = {date: action.payload.date}
  yield axios.put(`/api/walk/${id}`, date);
  yield put({type: 'FETCH_WALK'});
}


function* walkSaga() {
  yield takeLatest('CREATE_WALK', createWalk);
  yield takeLatest('DELETE_WALK', deleteWalk);
  yield takeLatest('FETCH_WALK', fetchWalk);
  yield takeLatest('UPDATE_WALK', updateWalk);
}

export default walkSaga;
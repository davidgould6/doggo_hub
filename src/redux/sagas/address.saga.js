import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchAddress function will send get request to user router.
function* fetchAddress() {
    // console.log('in fetchAddress Saga');
    const response = yield axios.get('/api/user/address');
    // console.log('FETCHADDRESS', response);
    yield put ({ type: 'SET_ADDRESS', payload: response.data});
}

function* addressSaga() {
  yield takeLatest('FETCH_ADDRESS', fetchAddress);
}

export default addressSaga;
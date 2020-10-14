import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* fetchAddress() {
    console.log('in fetchAddress Saga');
    const response = yield axios.get('/api/user/address');
    console.log('FETCHADDRESS', response);
    yield put ({ type: 'SET_ADDRESS', payload: response.data});
}

function* fetchAddressSaga() {
  yield takeLatest('FETCH_ADDRESS', fetchAddress);
}

export default fetchAddressSaga;



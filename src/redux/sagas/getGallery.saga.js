import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// createPet function will send post request to pet router.
function* getGallery() {
    console.log('in getGallerySaga');
    let response = yield axios({
        method: 'GET',
        url: '/api/gallery',
    });
    console.log('this is response from server', response);

    yield put({
      type: 'SET_GALLERY',
      payload: response.data
    });
}

function* getGallerySaga() {
  yield takeLatest('FETCH_GALLERY', getGallery);
}

export default getGallerySaga;
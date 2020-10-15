import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchGallery function will send get request to gallery router.
function* fetchGallery() {
    // console.log('in getGallerySaga');
    const response = yield axios.get('/api/gallery');
    // console.log('this is response from server', response);
    yield put({type: 'SET_GALLERY', payload: response.data});
}

function* fetchGallerySaga() {
  yield takeLatest('FETCH_GALLERY', fetchGallery);
}

export default fetchGallerySaga;
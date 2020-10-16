import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import createGroomingSaga from './createGrooming.saga';
import createPetSaga from './createpet.saga';
import createWalkSaga from './createWalk.saga';
import deleteGroomingSaga from './deleteGrooming.saga';
import deleteWalkSaga from './deleteWalk.saga';
import fetchGallerySaga from './fetchGallery.saga';
import fetchGroomingSaga from './fetchGrooming.saga';
import fetchPetsSaga from './fetchPets.saga';
import fetchAddressSaga from './fetchAddress.saga';
import fetchWalkSaga from './fetchWalk.saga';
import updateGroomingSaga from './updateGrooming.saga';
import updateWalkSaga from './updateWalk.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    createGroomingSaga(), // Saga listens for 'CREATE_GROOMING' sends post to grooming router
    createPetSaga(), // Saga listens for 'CREATE_PET' sends post to pet router
    createWalkSaga(), // Saga listens for 'CREATE_WALK' sends post to walk router
    deleteGroomingSaga(), // Saga listens for 'DELETE_WALK' sends delete request to grooming router
    deleteWalkSaga(), // Saga listens for 'DELETE_WALK' sends delete request to walk router
    fetchAddressSaga(), // Saga listens for 'FETCH_ADDRESS' fetches all user addresses 
    fetchGallerySaga(), // Saga listens for 'FETCH_GALLERY' gets all gallery items 
    fetchGroomingSaga(), // Saga listens for 'FETCH_GROOMING' gets all users scheduled groomings
    fetchPetsSaga(), // Saga listens for 'FETCH_PETS' gets all users pets
    fetchWalkSaga(), // Saga listens for 'FETCH_WALK' gets all users scheduled walks
    updateGroomingSaga(), // Saga listens for 'UPDATE_GROOMING' sends put request to grooming saga
    updateWalkSaga(), // Saga listens for 'UPDATE_WALK' sends put request to walk saga
  ]);
}

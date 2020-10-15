import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import createPetSaga from './createpet.saga';
import createWalkSaga from './createWalk.saga';
import fetchGallerySaga from './fetchGallery.saga';
import fetchPetsSaga from './fetchPets.saga';
import fetchAddressSaga from './fetchAddress.saga';
import fetchWalkSaga from './fetchWalk.saga';
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
    createPetSaga(), // Saga listens for 'CREATE_PET'
    createWalkSaga(), // Saga listens for 'CREATE_WALK'
    fetchAddressSaga(), // Saga listens for 'FETCH_ADDRESS' fetches all user addresses 
    fetchGallerySaga(), // Saga listens for 'FETCH_GALLERY gets all gallery items 
    fetchPetsSaga(), // Saga listens for 'FETCH_PETS' gets all users pets
    fetchWalkSaga(), // Saga listens for 'FETCH_WALK' gets all users scheduled walks
  ]);
}

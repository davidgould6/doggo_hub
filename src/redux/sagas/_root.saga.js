import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import addressSaga from './address.saga';
import gallerySaga from './gallery.saga';
import groomingSaga from './grooming.saga';
import petSaga from './pet.saga';
import walkSaga from './walk.saga';
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
    gallerySaga(), // Saga listens for 'FETCH_GALLERY'
    addressSaga(), // Saga listens for 'FETCH_ADDRESS'
    groomingSaga(), // Saga listens for 'CREATE_GROOMING', 'DELETE_GROOMING', 'FETCH_GROOMING', 'UPDATE_GROOMING'
    petSaga(), // Saga listens from 'CREATE_PET', 'FETCH_PETS'
    walkSaga(), // Saga listens for 'CREATE_WALK', 'DELETE_WALK', 'FETCH_WALK', 'UPDATE_WALK'
  ]);
}

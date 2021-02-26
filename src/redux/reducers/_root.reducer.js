import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import stateAbbr from './static.states.reducer';
import gallery from './gallery.reducer';
import groomingReducer from './grooming.reducer';
import petReducer from './pet.reducer';
import addressReducer from './address.reducer';
import walkReducer from './walk.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  stateAbbr, // will contain all 50 states to be able to map through for select options.
  gallery, // receives data from saga that is from server for gallery images for carousel
  groomingReducer, // gets all users scheduled groomings
  petReducer, // gets all users pets
  addressReducer, // gets users addresses
  walkReducer, // gets all users scheduled walks
});

export default rootReducer;
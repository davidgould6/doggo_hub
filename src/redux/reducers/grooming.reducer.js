const groomingReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GROOMING':
      return action.payload;
    default:
      return state;
  }
}

export default groomingReducer;
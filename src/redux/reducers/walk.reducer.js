const walkReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WALKS':
      return action.payload;
    default:
      return state;
  }
}

export default walkReducer;
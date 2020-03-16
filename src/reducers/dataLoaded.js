export const dataLoaded = (state = false, action) =>{
  switch(action.type){
    case 'UPDATE_DATA_LOADED':
      return action.bool;
    default:
      return state;
  }
}

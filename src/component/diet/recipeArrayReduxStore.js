import {createStore} from 'redux' // npm install --save redux
function reducer(state, action) { 
  console.log("reducer(state) : ",state)
  console.log("reducer(action) : ",action)
    if(state == undefined) {
      return {
        recipeArr:[],
        recipeCrudArray:[]
      }
    }
    const newState = {...state};
    switch(action.type) { 
      case "recipeArr" : newState.data1 = action.recipeArr; break;
      case "recipeCrudArray" : newState.recipeCrudArray = action.recipeCrudArray; break;
    }
    return newState;
  }
  const  store = createStore(reducer);
  export default store;
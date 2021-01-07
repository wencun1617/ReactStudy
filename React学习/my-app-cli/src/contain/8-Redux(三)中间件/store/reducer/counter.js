const initialCounter = {
  counter: 0
}
export default function counterReducer(state = initialCounter, action) {
  switch (action.type) {
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.num };
    case "SUB_NUMBER":
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}
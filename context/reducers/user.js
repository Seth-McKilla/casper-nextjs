export function user(state, action) {
  switch (action.type) {
    case "ASSIGN_PUB_KEY":
      return { ...state, user: action.payload };
    case "SET_NETWORK_NAME":
      return { ...state, networkName: action.payload };
    default:
      return state;
  }
}

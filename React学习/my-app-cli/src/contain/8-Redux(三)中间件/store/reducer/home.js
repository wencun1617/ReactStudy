const initialHome = {
  banners: [],
  recommends: []
}

export default function homeReducer(state = initialHome, action) {
  switch (action.type) {
    case "CHANGE_BANNER":
      return { ...state, banners: action.banners };
    case "CHANGE_RECOMMEND":
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}
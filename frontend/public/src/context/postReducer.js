export const initialState = {
  posts: [],
  loading: false,
};

const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_POSTS":
      return {
        ...state,
        posts: payload.posts,
      };
    default:
      throw new Error(`No case for ${type} found in postReducer`);
  }
};

export default postReducer;

const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_LOADING":
      return {
        ...state,
        isLoadingCategory: true,
      };
    case "SET_CATEGORY_DATA":
      return {
        ...state,
        isLoadingCategory: false,
        categories: action.payload,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        isLoadingCategory: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default CategoryReducer;

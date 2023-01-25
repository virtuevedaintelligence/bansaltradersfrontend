const ProductReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_PRODUCT_DATA":
      const featuredProd = action.payload.filter((curElement) => curElement.featured === true);
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: featuredProd,
      };
    case "PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SINGLE_PRODUCT_LOADING":
      return {
        ...state,
        isSingleProductLoading: true,
      };
    case "SET_SINGLE_DATA":
      return {
        ...state,
        isSingleProductLoading: false,
        singleProduct: action.payload,
      };
    case "SINGLE_ERROR":
      return {
        ...state,
        isSingleProductLoading: false,
        isError: true,
      };
    case "SAVE_PRODUCT_LOADING":
      return {
        ...state,
        isSaveProductLoading: true,
      };
    case "SAVE_PRODUCT":
      return {
        ...state,
        isSaveProductLoading: false,
        saveProduct: action.payload,
      };
    case "SAVE_ERROR":
      return {
        ...state,
        isSaveProductLoading: false,
        isError: true,
      };
    case "DELETE_PRODUCT_LOADING":
      return {
        ...state,
        isDeleteProductLoading: true,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        isDeleteProductLoading: false,
        deleteProduct: action.payload,
      };
    case "DELETE_ERROR":
      return {
        ...state,
        isDeleteProductLoading: false,
        isError: true,
      };
    case "UPDATE_PRODUCT_LOADING":
      return {
        ...state,
        isUpdateProductLoading: true,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        isUpdateProductLoading: false,
        updateProduct: action.payload,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        isUpdateProductLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default ProductReducer;

import { createContext, useContext, useEffect, useReducer } from "react";
import ProductService from "../services/ProductService";
import reducer from "../reducer/productReducer";

const ProductContext = createContext();
const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featuredProducts: [],
    isSingleProductLoading: false,
    singleProduct: {},
    isSaveProductLoading: false,
    saveProduct: {},
    isDeleteProductLoading: false,
    deleteProduct: {}
};

const ProductProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchData = async () => {
        dispatch({ type: "PRODUCT_LOADING" });
        try {
            const response = await ProductService.getProducts();
            const products = await response.data;
            dispatch({ type: "SET_PRODUCT_DATA", payload: products });
        } catch (error) {
            console.log(error);
            dispatch({ type: "PRODUCT_ERROR" });
        }
    };

    const getSingleProduct = async (id) => {
        dispatch({ type: "SINGLE_PRODUCT_LOADING" });
        try {
            const singleResponse = await ProductService.getProductById(id);
            const singleProduct = await singleResponse.data;
            dispatch({ type: "SET_SINGLE_DATA", payload: singleProduct });
        }
        catch (error) {
            console.log(error);
            dispatch({ type: "SINGLE_ERROR" });
        }
    }

    const saveProductCall = async (product) => {
        dispatch({ type: "SAVE_PRODUCT_LOADING" });
        try {
            const saveReponse = await ProductService.saveProduct(product);
            const saveProduct = await saveReponse.data;
            dispatch({ type: "SAVE_PRODUCT", payload: saveProduct });
        }
        catch (error) {
            console.log(error);
            dispatch({ type: "SAVE_ERROR" });
        }
    }
    const deleteProductCall = async (id) => {
        dispatch({ type: "DELETE_PRODUCT_LOADING" });
        try {
            const deleteResponse = await ProductService.deleteProduct(id);
            const deleteProduct = await deleteResponse.data;
            dispatch({ type: "DELETE_PRODUCT", payload: deleteProduct });
        }
        catch (error) {
            console.log(error);
            dispatch({ type: "DELETE_ERROR" });
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ProductContext.Provider value={{ ...state, getSingleProduct, saveProductCall, deleteProductCall }}>
            {children}
        </ProductContext.Provider >
    );
};

//custom hook

const useProductContext = () => {
    return useContext(ProductContext);
};

export { ProductProvider, ProductContext, useProductContext };
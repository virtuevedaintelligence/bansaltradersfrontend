import axios from "axios";

const PRODUCTS_API_BASE_URL = "http://localhost:8082/v1/products";

class ProductService {
  saveProduct(product) {
    console.log(product);
    return axios.post(PRODUCTS_API_BASE_URL + "/createProduct", product);
  }

  getProducts(userId) {
    if (userId == null) {
      return axios.get(PRODUCTS_API_BASE_URL + "/getAllProducts");
    } else {
      return axios.get(PRODUCTS_API_BASE_URL + "/getAllProducts" + `?userId=${userId}`);
    }
  }

  getProductById(id) {
    return axios.get(PRODUCTS_API_BASE_URL + "/productDetail/" + id);
  }

  deleteProduct(id) {
    return axios.delete(PRODUCTS_API_BASE_URL + "/delete/" + id);
  }

  updateProduct(id, product) {
    return axios.put(PRODUCTS_API_BASE_URL + "/updateProduct/" + id, product);
  }

  getProductReviews(id) {
    return axios.get(PRODUCTS_API_BASE_URL + "/productRating/" + id);
  }
  favoriteProduct(productId, userId) {
    return axios.get(PRODUCTS_API_BASE_URL + "/favorite/" + productId + "/" + userId);
  }
}

export default new ProductService();

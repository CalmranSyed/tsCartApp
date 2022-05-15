import ProductStructure from "./IProductStructure";
import apiURL from "./AppConstants";

const axios = require("axios").default;

export default class APICall {
  getProducts(): Promise<ProductStructure[]> {
    // create an empty array to store products to store
    var products: ProductStructure[] = [];
    return axios.get(apiURL)
  }
}

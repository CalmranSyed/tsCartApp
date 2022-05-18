import ProductStructure from "./IProductStructure";
import apiURL from "./AppConstants";

const axios = require("axios").default;

export default class APICall {
    getProducts(): Promise<ProductStructure[]> {
        return axios.get(apiURL)
    }
}

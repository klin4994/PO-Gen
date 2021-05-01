import axios from "axios";

export default {
    // Get all products
    getProducts: function() {
        return axios.get("/api/products")
    }
}
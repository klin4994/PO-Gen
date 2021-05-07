import axios from "axios";

export default {
    // Get all products
    getProducts: function() {
        return axios.get("/api/products")

    },
    // Add new product
    addProduct: function(productData) {
        return axios.post("/api/products", productData)
    },
    // User/Company Login
    login: function(loginDetails) {
        return axios.post("/api/login", loginDetails)
    }
}
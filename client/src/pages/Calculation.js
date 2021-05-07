import React, {useState, useEffect, useRef} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"
import {useUpdateEffect} from "react-use"
import { set } from "mongoose";


function Calculation({checkLoginState}) {
    // useEffect(() =>{
    //     const isAuthenticated = checkLoginState();
    //     if (!isAuthenticated) {
    //         window.location.replace("/login");
    //     }
    //   })
    
    // Load data
    useEffect (() => {
        loadProducts()
    }, [])
    
    const qtyInput = useRef(null)
    const productSet = useRef(null)
    console.log(qtyInput.current)
    // Overage 5%
    const overage = 1.05;
    // Set products state
    const [products, setProducts] = useState([])
    // Set product qty state
    const [quantity, setQuantity] = useState(0)
    // Set state for currently selected product key 
    const [currentProductKey, setCurrentProductKey] = useState()
    // Set state for currently selected product
    const [currentProduct, setCurrentProduct] = useState({})
    console.log(currentProduct) 
    console.log(quantity)
    const handleCalculation = () => {
        
        setQuantity(qtyInput.current.value)

        
        console.log(quantity)
        console.log(products[1])
        // Object to store the modified product object
        let selectedProduct;
        // loops through all product to find the matching one by key and set as current product
        products.forEach(product => {
            // If the key matches, store properties in the newly declared variable object
            if (product.key === productSet.current.value ) {
                selectedProduct = product
            }
            // Add new property (total_price) to every raw material
            selectedProduct.formulation.forEach(rm => {
                
                rm.total_price =  (overage * rm.unit_price * qtyInput.current.value  * product.qtyPerPack * rm.coefficient / 1000000).toFixed(2)
            })
            // set the modified object as the current product
            setCurrentProduct(selectedProduct)
        })
        
    }

 
    async function loadProducts () {
        API.getProducts ()
        .then(res => 
            setProducts(res.data),
          )
          .catch(err => console.log(err));
    }
    console.log(currentProduct)
    return (
        <div>
        <ProductList ref={productSet}>
        {products.map(product => (
            <ProductListItem key={product.key}>{product}</ProductListItem>
        ))}
        </ProductList>
        {/* <ProductQtyInput ref={qtyInput} value={quantity}></ProductQtyInput> */}
        <ProductQtyInput ref={qtyInput} ></ProductQtyInput>
        <SetProductBtn onClick={handleCalculation} />
       
        {currentProduct !== 0 ? <OrderTable>{currentProduct} </OrderTable> : <></>}       
        </div>
    );
}

export default Calculation
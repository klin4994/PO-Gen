import React, {useState, useEffect, useRef} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"
import {useUpdateEffect} from "react-use"


function Calculation() {

    
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
    const [quantity, setQuantity] = useState(5)
    // Set state for currently selected product key 
    const [currentProductKey, setCurrentProductKey] = useState()
    // Set state for currently selected product
    const [currentProduct, setCurrentProduct] = useState([])
    console.log(currentProduct)
    console.log(quantity)
    // const handleSetProduct = () => {

        
    //     // Query and update if different input quantity
    //         console.log(quantity)
    //         setQuantity(qtyInput.current.value)
    //         console.log(quantity)
            
    //         // loops through all product to find the matching one by key and set as current product
    //         products.forEach(product => {
    //             // if the selected product is different from the previous one, update the state
    //             if (product.key === productSet.current.value ) {
    //                 setCurrentProduct(product)
    //                 console.log(product)
    //                 product.formulation.forEach(rm => {
    //                     console.log("qty", currentProduct)
    //                     rm.total_price =  (overage * rm.unit_price * quantity * currentProduct.qtyPerPack * rm.coefficient / 1000000).toFixed(2)
    //                 })
    //                 console.log(currentProduct)
                    
    //             }
    //         })
            
    //         // if (currentProduct.length !== 0) {
    //         //     currentProduct.formulation.forEach(rm => {
    //         //         rm.total_price =  (overage * rm.unit_price * quantity * currentProduct.qtyPerPack * rm.coefficient / 1000000).toFixed(2)
    //         //     })

    //         // }
    // }

    useEffect (() => {
        console.log(currentProductKey)
        console.log(quantity)
        console.log(products)
        products.forEach(product => {
            // if the selected product is different from the previous one, update the state
            if (product.key === currentProductKey ) {
                setCurrentProduct(product)
                console.log(currentProduct)
                product.formulation.forEach(rm => {
                    console.log("qty", currentProduct)
                    rm.total_price =  (overage * rm.unit_price * quantity * product.qtyPerPack * rm.coefficient / 1000000).toFixed(2)
                console.log(currentProduct)
                })
                console.log(currentProduct)
                
            }
        })
    }, [currentProductKey, quantity])
 
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
        <SetProductBtn onClick={() => {setCurrentProductKey(productSet.current.value); setQuantity(qtyInput.current.value)}} />
        {currentProduct.length !== 0 ? <OrderTable>{currentProduct} </OrderTable> : <></>}       
        </div>
    );
}

export default Calculation
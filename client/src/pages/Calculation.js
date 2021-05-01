import React, {useState, useEffect, useRef} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"


function Calculation() {
    // Overage 5%
    const overage = 1.05;
    // Set products state
    const [products, setProducts] = useState([])
    // Set product qty state
    const [quantity, setQuantity] = useState(1)
    // Set state for currently selected product key 
    const [currentProductKey, setcurrentProductKey] = useState("")
    // Set state for currently selected product
    const [currentProduct, setCurrentProduct] = useState([])
    
    const qtyInput = useRef(null)
    const productSet = useRef(null)

    const handleSetProduct = () => {
        
        const currentPTKey = productSet.current.value
        // Query and update if different input quantity
        if (qtyInput.current.value !== quantity || currentPTKey !== currentProductKey) {
            // Update states
            setQuantity(qtyInput.current.value)
            setcurrentProductKey(currentPTKey)
            products.forEach(product => {
                // if the selected product is different from the previous one, update the state
                if (product.key === currentPTKey ) {
                    setCurrentProduct(product)
                    console.log(currentProduct)
                    return
                }
            })

        }
    }

    // Load all products on mount
    useEffect (() => {
        loadProducts();
    }, [])

    // Effect when updating product selected, skips mounting
    useEffect (() => {
        console.log(currentProduct)  
        if (currentProduct.length !== 0) {
        currentProduct.formulation.forEach(rm => {
            rm.total_price =  (overage * rm.unit_price * quantity * currentProduct.qtyPerPack * rm.coefficient / 1000000).toFixed(2)
        }) 
    }},[currentProduct, quantity])


    async function loadProducts () {
        API.getProducts ()
        .then(res => 
            setProducts(res.data)
          )
          .catch(err => console.log(err));
    }

    return (
        <div>
        <ProductList ref={productSet}>
        {products.map(product => (
            <ProductListItem key={product.key}>{product}</ProductListItem>
        ))}
        </ProductList>
        <ProductQtyInput ref={qtyInput} value={quantity}></ProductQtyInput>
        <SetProductBtn onClick={handleSetProduct} />
        {currentProduct.length !==0 ? <OrderTable>{currentProduct} </OrderTable> : <></>}       
        </div>
    );
}

export default Calculation
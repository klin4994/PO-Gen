import React, {useState, useEffect, useRef, useContext} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"
import AllProductsContext from '../components/AllProductsContext';


function Calculation() {
    const [allProducts, setAllProducts] = useState()
    const value = {allProducts, setAllProducts}
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
        loadProducts()
        setQuantity(qtyInput.current.value)
        
        
        console.log(quantity)
        console.log(products[1])
        // Object to store the modified product object
        let selectedProduct;
        // loops through all product to find the matching one by key and set as current product
        products.forEach(product => {
            // If the key matches, store properties in the selectProduct
            if (product.key === productSet.current.value ) {
                selectedProduct = product
                // Add new property (total_price) to every raw material
                selectedProduct.formulation.forEach(rm => {
                    // 1.05 * 1 *20 * 150 * 1000
                    // bottle/box:
                    // 1.05 * 1 * 20 * 0.05 = 1
                    rm.quantity = (overage * qtyInput.current.value * product.qtyPerPack * rm.coefficient)
                    
                    // Divide the quantity unity by 1000000 - convert mg (calculated above) to kg, for weight units only
                    const conversionFactor = 1000000
                    if (rm.unit === 'KG') {
                        rm.quantity /= conversionFactor;
                    };
                    // Calculate total price 
                    rm.total_price =  (rm.quantity * rm.unit_price).toFixed(2)
                    console.log(rm.quantity, "------", rm.total_price)                    
                })
            }
            

            // set the modified object as the current product
            setCurrentProduct(selectedProduct)
        })
        
    }

 
    async function loadProducts () {
        API.getProducts ()
        .then(res => {
            setProducts(res.data);
            setAllProducts(res.data)
            }
        )
          .catch(err => console.log(err));
    }
    console.log(currentProduct)
    return (
        <AllProductsContext.Provider value={value}>
        <div id="page-container" style={{ maxWidth : "90%", marginLeft:"auto", marginRight:"auto"}}>
        <div >
            <ProductList ref={productSet}>
            {products.map(product => (
                <ProductListItem key={product.key}>{product}</ProductListItem>
            ))}
            </ProductList>
            <ProductQtyInput ref={qtyInput} ></ProductQtyInput>
        </div>
        <span><strong>Product: </strong>{currentProduct.name}</span>
        <br/>
        {/* <ProductQtyInput ref={qtyInput} value={quantity}></ProductQtyInput> */}
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <SetProductBtn onClick={handleCalculation} />
        </div>
       
        {currentProduct !== 0 ? <OrderTable>{currentProduct} </OrderTable> : <></>}       
        </div>
        </AllProductsContext.Provider>
    );
}

export default Calculation
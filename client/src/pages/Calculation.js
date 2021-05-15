import React, {useState, useEffect, useRef, useContext} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"
import AllProductsContext from '../components/AllProductsContext';
import { Button } from 'antd';
import AuthContext from '../components/AuthContext'
import _ from 'lodash';
function Calculation() {
    // const [allProducts, setAllProducts] = useState()
    // const value = {allProducts, setAllProducts}
    // Load data

    useEffect (() => {
        loadVendors()
    }, [])
    useEffect (() => {
        loadProducts()
    }, [])
    const qtyInput = useRef(null)
    const productSet = useRef(null)
    // Overage 5%
    const overage = 1.05;
    // Set products state
    const [products, setProducts] = useState([])
    // Set product qty state
    const [quantity, setQuantity] = useState(0)
    // Set vendors 
    const [vendors, setVendors] = useState([])
    // Set state for currently selected product
    const [currentProduct, setCurrentProduct] = useState({})

    const handleCalculation = () => {
        loadProducts()
        setQuantity(qtyInput.current.value)
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
                    rm.quantity = (overage * qtyInput.current.value * product.qtyPerPack * rm.coefficient).toFixed(2)

                    // Divide the quantity unity by 1000000 - convert mg (calculated above) to kg, for weight units only
                    const conversionFactor = 1000000
                    if (rm.unit.toUpperCase() === 'KG') {
                        rm.quantity = (rm.quantity/conversionFactor).toFixed(2);
                    };
                    // Calculate total price 
                    rm.total_price =  (rm.quantity * rm.unit_price).toFixed(2)                   
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
            // setAllProducts(res.data)
            }
        )
          .catch(err => console.log(err));
    }
    
    async function loadVendors () {
        API.getVendors ()
        .then(res => {
            setVendors(res.data);
            }
        )
          .catch(err => console.log(err));
    }

    const handleAdd = () => {
        const newRow = {
          key: '',
          name: '',
          quantity: '',
          unit: '',
          unit_price: '',
          total_price: '',
          vendor_name:''
        };
        // cloning current product for setCurrentProduct to detect new object and trigger rerendering
        const clone = obj => Object.assign({}, ...obj);
        const addRmProduct = clone([currentProduct]);

        addRmProduct.formulation = [...addRmProduct.formulation, {...newRow}]
        // const currentRows = [...currentProduct.formulation]
        setCurrentProduct(addRmProduct)
      };
      console.log(vendors)
    return (
        // <AllProductsContext.Provider value={value}>
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

        {currentProduct !== 0 ? <OrderTable>{{currentProduct, vendors}} </OrderTable> : <></>}    
        {!_.isEmpty(currentProduct) ?
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button> :
        <></>}   
        </div>
        // </AllProductsContext.Provider>
    );
}

export default Calculation
import React, { useState, useEffect, useRef } from 'react'
import OrderTable from '../components/OrderTable'
import CalcInputForm from '../components/CalcInputForm'
import API from '../utils/API'
import { message,Layout } from 'antd'
import _ from 'lodash'

const { Content } = Layout
function Calculation () {

  useEffect(() => {
    loadVendors()
  }, [])
  useEffect(() => {
    loadProducts()
  }, [])
  const qtyInput = useRef(null)
  const productSet = useRef(null)
  // Overage 5%, ie. order extra qty to compensate for potential material loss during production
  const overage = 1.05
  // Set products state
  const [products, setProducts] = useState([])
  // Set product qty state
  const [quantity, setQuantity] = useState(0)
  // Set vendors
  const [vendors, setVendors] = useState([])
  // Set state for currently selected product
  const [currentProduct, setCurrentProduct] = useState({})

  const handleCalculation = (selectedP, selectedQ) => {
    if (!selectedP || !selectedQ) {
      console.log('no data')
      message.warning('Please complete all fields below')
      return
    }

    loadProducts()
    setQuantity(selectedQ)
    // Object to store the modified product object
    let selectedProduct
    // loops through all product to find the matching one by key and set as current product
    products.forEach(product => {
      // If the key matches, store properties in the selectProduct -> productSet.current.value
      if (product.key === selectedP) {
        selectedProduct = product
        // Add new property (total_price) to every raw material
        selectedProduct.formulation.forEach(rm => {
          // 1.05 * 1 *20 * 150 * 1000
          // bottle/box:
          // 1.05 * 1 * 20 * 0.05 = 1
          rm.quantity = (overage * selectedQ * product.qtyPerPack * rm.coefficient).toFixed(2)

          // Divide the quantity unity by 1000000 - convert mg (calculated above) to kg, for weight units only
          const conversionFactor = 1000000
          if (rm.unit.toUpperCase() === 'KG') {
            rm.quantity = (rm.quantity / conversionFactor).toFixed(2)
          };
          // Calculate total price
          rm.total_price = (rm.quantity * rm.unit_price).toFixed(2)
        })

        // set the modified object as the current product
        setCurrentProduct(selectedProduct)
      }
    })
  }

  async function loadProducts () {
    API.getProducts()
      .then(res => {
        setProducts(res.data)
        // setAllProducts(res.data)
      }
      )
      .catch(err => console.log(err))
  }

  async function loadVendors () {
    API.getVendors()
      .then(res => {
        setVendors(res.data)
      }
      )
      .catch(err => console.log(err))
  }
  return (
    // Page layout (except the side navbar and footer)
    <Layout style={{ minHeight: '93vh', maxWidth: '100vw'}}>
      {/* Form that takes user input: product code and the quantity in packages */}
      <CalcInputForm products= {products} 
        currentProduct={currentProduct} 
        onFinish={({ selectedPt, selectedQty }) => { handleCalculation(selectedPt, selectedQty) 
        }}/>
        {/* Result table, to be rendered only when there are valid results (after calculation) */}
        {!_.isEmpty(currentProduct) ?
            <OrderTable>{{ currentProduct, vendors }} </OrderTable>
            :<></>
        }
    </Layout>
  )
}

export default Calculation

import React, { useState, useEffect, useRef, useContext } from 'react'
import OrderTable from '../components/OrderTable'
import API from '../utils/API'
import { Button, Form, Select, InputNumber, message, Divider, Layout, Space, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'

const { Content } = Layout
function Calculation () {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  }
  const tailLayout = {
    wrapperCol: {
      offset: 1,
      span: 5
    }
  }
  const tailLayout2 = {
    wrapperCol: {
      offset: 1,
      span: 20
    }
  }

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
    <Layout style={{ minHeight: '93vh', maxWidth: '100vh'}}>
      <Content style={{ marginTop: '3em' }}>
        <Form {...layout} onFinish={({ selectedPt, selectedQty }) => { handleCalculation(selectedPt, selectedQty) }}>
          {/* input product information form */}
          <Row>
            <Col xs={{ span: 22, offset: 1}} sm={{ span: 22, offset: 1 }} md={{ span: 16, offset: 2 }} lg={{ span: 16, offset: 5 }} xl={{ span: 16, offset: 8 }} xxl={{ span: 16, offset: 16 }}>
              <Paper variant='outlined' style={{ padding: '1em 3em' }}>

                <br />
                <Col>
                  <Row>
                    <Col xxl={{ offset: 1 }} style={{ marginBottom: '1em' }}>
                        <strong style={{ color: 'rgb(8, 105, 124)', fontFamily: 'Arial', fontSize: '1.5em' }}>Enter product information below:</strong>
                      </Col>
                  </Row>
                  <Row>
                    <Col offset={1} span={20}>
                      
                        <Form.Item {...tailLayout} label='Product code:' name='selectedPt' style={{ fontFamily: 'Arial' }}>
                                <Select
                                  style={{ width: '14em' }}
                                  dropdownMatchSelectWidth={false}
                                  dropdownRender={menu => (
                                      <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div>
                                        <a style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} href='/addproduct'>
                                    <PlusOutlined /> New Product
                                  </a>
                                      </div>
                                      </div>
                                    )}
                                  placeholder='Select code'
                                >
                                  {products.map(product => (
                                      <Select.Option key={product.key}>{product.key}</Select.Option>
                                    ))}
                                </Select>
                              </Form.Item>
                      </Col>
                      </Row>
                      <Row>
                    <Col offset={1} span={20}>
                        <Form.Item {...tailLayout} label='Package quantity:' name='selectedQty' tooltip='E.g for 5000 bottles/boxes of blisters, enter 5000.' style={{ fontFamily: 'Arial' }}>
                                <InputNumber placeholder='Enter Qty' min='0' style={{ width: '14em' }} />
                              </Form.Item>
                      </Col>
                  </Row>
                </Col>
                <Col xxl={{ offset: 1 }} style={{display:'flex', justifyContent: 'center'}}>
                  <Form.Item >
                    <Button size='large' htmlType='submit' style={{  margin:"0 auto",  width: 'auto', backgroundColor: 'rgb(8, 105, 124)', color: 'white', borderColor: 'rgb(8, 105, 124)' }}>
                        Calculate
                            </Button>
                  </Form.Item>
                </Col>
                <Col xxl={{ offset: 1 }}>
                  {!_.isEmpty(currentProduct) ? <h2 style={{ fontFamily: 'Arial' }}> {currentProduct.name}</h2> : <></>}
                </Col>
              </Paper>
            </Col>
          </Row>
        </Form>
        {/* Result table, only renders when there is valid result (after calculation) */}
        {!_.isEmpty(currentProduct) ?
        <Row style={{ marginTop: '4%' }}>
          <Col sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} lg={{ span: 24, offset: 1 }} xl={{ span: 24, offset: 5 }} xxl={{ span: 24, offset: 12 }}>
            <Paper style={{ padding: '1em 1em' }}><OrderTable>{{ currentProduct, vendors }} </OrderTable></Paper>
          </Col>
        </Row> :
        <></>
        }
      </Content>
    </Layout>
  )
}

export default Calculation

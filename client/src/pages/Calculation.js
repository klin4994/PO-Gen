import React, {useState, useEffect, useRef, useContext} from "react";
import {ProductList, ProductQtyInput, ProductListItem, SetProductBtn, ProductForm } from "../components/ProductList"
import OrderTable from "../components/OrderTable"
import API from "../utils/API"
import AllProductsContext from '../components/AllProductsContext';
import { Button, Form, Select, InputNumber, message, Divider, Layout, Space, Row, Col} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AuthContext from '../components/AuthContext'
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import { useSpring, animated } from 'react-spring';


const { Content } = Layout;
function Calculation() {
    // const [allProducts, setAllProducts] = useState()
    // const value = {allProducts, setAllProducts}
    // Load data
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 1,
          span: 5,
        },
      };

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

    const handleCalculation = (selectedP, selectedQ) => {
        if (!selectedP || !selectedQ){
            console.log("no data")
            message.warning('Please complete all fields below')
            return
        }

        loadProducts()
        setQuantity(selectedQ)
        // Object to store the modified product object
        let selectedProduct;
        // loops through all product to find the matching one by key and set as current product
        products.forEach(product => {
            console.log("count")
            console.log(products)
            console.log(product.key)
            console.log(selectedP)
            // If the key matches, store properties in the selectProduct -> productSet.current.value 
            if (product.key === selectedP ) {
                console.log("product.key")
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
                        rm.quantity = (rm.quantity/conversionFactor).toFixed(2);
                    };
                    // Calculate total price 
                    rm.total_price =  (rm.quantity * rm.unit_price).toFixed(2)                   
                })
            
            

            // set the modified object as the current product
            setCurrentProduct(selectedProduct)
        }
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
      console.log(products)

      // transition style
      const springStyle = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config:{ duration: 2000 }})
      
    return (
        // <AllProductsContext.Provider value={value}>
            <Layout style={{ minHeight: '100vh',minWidth: '100vh' }}>
              <Content style={{minWidth : "60%", marginTop:"3em", marginLeft:"auto", marginRight:"auto"}}>
                <Paper variant="outlined" style={{padding: "3em 6em"}}> 
                  
                  {/* <animated.div style={springStyle}>I will fade in</animated.div> */}
                  <Form {...layout} onFinish={({selectedPt, selectedQty}) => {handleCalculation(selectedPt, selectedQty)}}>
                  <h1 style={{color: "rgb(8, 105, 124)", fontFamily:"Arial"}}>Enter product information below:</h1>
                  <br/>
                  <Form.Item>
                    <Row gutter={{xs:400 , md: 100 , lg:100}}>
                      <Col >
                        <Form.Item  {...tailLayout} label="Product code:" name="selectedPt" >
                          <Select style={{ width: "12em"}}
                        dropdownMatchSelectWidth={false}
                        dropdownRender={menu => (
                            <div>
                              {menu}
                              <Divider style={{ margin: '4px 0' }} />
                              <div >
                                <a
                                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                  href="/addproduct"
                                >
                                  <PlusOutlined /> New Product
                                </a>
                              </div>
                            </div>
                          )}
                          placeholder="Select Product Code">
                        {products.map(product => (
                            <Select.Option key={product.key}>{product.key}</Select.Option>
                        ))}
                        </Select>
                        </Form.Item>
                      </Col>
                      <Col >
                        <Form.Item  {...tailLayout} label="Package quantity:"name="selectedQty" tooltip="E.g for 5000 bottles/boxes of blisters, enter 5000.">
                            <InputNumber placeholder="Enter Qty" min='0'style={{ width: 200}}/>
                        </Form.Item>
                      </Col>
                      <Col >
                      <Form.Item >
                        <Button size="large" htmlType="submit" style={{backgroundColor:"rgb(8, 105, 124)", color:"white", borderColor: "rgb(8, 105, 124)"}} >
                          Calculate
                      </Button>
                      </Form.Item>
                      </Col>
                    </Row>
                    {!_.isEmpty(currentProduct)? <h2> {currentProduct.name}</h2>:<></>}
                  </Form.Item>
                  </Form>
            </Paper>
            <div style={{marginTop:"2%"}}>
              {currentProduct !== 0 ?<Paper variant="outlined" style={{padding: "2em 2em"}}>  <OrderTable >{{currentProduct, vendors}} </OrderTable></Paper> : <></>} 
            </div>
            </Content>


        {/* <ProductQtyInput ref={qtyInput} value={quantity}></ProductQtyInput> */}
   
      
        {/* {!_.isEmpty(currentProduct) ?
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button> :
        <></>}  */}
        </Layout>  
        // </AllProductsContext.Provider>
    );
}

export default Calculation
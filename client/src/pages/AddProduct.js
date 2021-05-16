import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import API from '../utils/API'
import { Form, Input, InputNumber, Button, Space, Tooltip, Popconfirm, Radio, Layout, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined, DeleteFilled, InfoCircleOutlined } from '@ant-design/icons';
import Paper from '@material-ui/core/Paper';
import ScrollUpButton from 'react-scroll-up-button'



const { Content } = Layout;
export default function AddProduct () {


    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
    const validateMessages = {
        
        required: '${label} is required!',
        types: {
          number: '${label} is not a valid number!',
          email: '${label} is not a valid email!'
        },
        // number: {
        //     range: '${label} must be between ${min} and ${max}',
        //   },
      };
      let coefficientTooltip = 
      <span>
        Weight unit in mg. <br/>
        E.g.100mg per capsule, enter 100;<br/>
        <br/>
        For countable materials, divide by the dosage quantity in one package.<br/>
        E.g if 1 bottle per 20 capsules, enter 0.05;<br/>
      </span>
      // Handles updating component state when the user types into the input field
    //    function handleInputChange(event) {
    //     const { name, value } = event.target;
    //     setFormObject({...formObject, [name]: value})
    //   };
    
    
        const onFinish = ({product, formulation, ...rest}) => {
            // Initialize object to post
            product.user = "6093c20ad150a04ab444bc95"
            console.log(product)
            const mergeToPost = {
                ...product,
                formulation:formulation
            };

            // console.log(mergeToPost);
            API.addProduct(mergeToPost)
                // .then(() => setFormObject({
                    
                    // }))
                .then(() => console.log("done!"))
                .catch(err => console.log(err));
            }
            
            const scrollToTop = () => {

            }

          return (
              
              //<Form {...layout} name="product-form" onFinish={onFinish} validateMessages={validateMessages}> 
        <Layout style={{ minHeight: '100vh',minWidth: '100vh' }}>
           <Content style={{minWidth : "40%", maxWidth:"40%",marginTop:"3em", marginLeft:"auto", marginRight:"auto"}}> 
                    <Form.Provider>
                            <Form name="new-product-form" onFinish={onFinish} autoComplete="off" validateMessages={validateMessages}>
                                <Row >
                                    {/* Product form */}
                                    <Col span={24}>
                                        

                                        <Paper variant="outlined" style={{padding: "3em 6em"}}>
                                        {/* <div className = "form-container"> */}
                                        <h1 style={{color: "rgb(8, 105, 124)", fontFamily:"Arial"}}>Product information:</h1>
                                        <Form.Item
                                            name={['product', 'key']}
                                            label="Product Code"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                                ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['product', 'name']}
                                            label="Product Name/Description"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                                ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['product', 'packaging']}
                                            label="Packaging Type"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                                ]}
                                        >
                                            <Radio.Group defaultChecked="a" buttonStyle="solid">
                                                <Radio.Button value="a">Bottle</Radio.Button>
                                                <Radio.Button value="b">Box (Blisters)</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            name={['product', 'dosageForm']}
                                            label="Dosage Form"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                                ]}
                                        >
                                            <Radio.Group defaultChecked="a" buttonStyle="solid">
                                                <Radio.Button value="a">Tablet</Radio.Button>
                                                <Radio.Button value="b">Capsule</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            name={['product', 'qtyPerPack']}
                                            label="Dosage units per package"
                                            rules={[
                                                {
                                                    type: 'number',
                                                    min: 0,
                                                    required: true,
                                                },
                                                ]}
                                        >
                                            <InputNumber min='0'/>
                                        </Form.Item>
                                        {/* </div> */}
                                        
                                        </Paper>
                                    </Col>
                                </Row>
                                    {/* Formulation form */}
                                    
                                        <Form.List name="formulation" style={{display:'inline',flexDirection: 'row'}} >
                                    
                                            {(fields, { add, remove }) => (
                                                <>
                                            <Row gutter={30}>
                                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    
                                                    <Col key ={key} span={{md:1, lg:11}} >
                                                        <Paper elevation={7} style={{ padding:"3em", marginTop:"2em", minWidth:'100%'}}>
                                                            <Popconfirm title={"Are you sure? "}onConfirm={() => remove(name)} okText="Yes" cancelText="No" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                                                <Button type="primary" danger placement="right" icon={<DeleteFilled />} style={{width:"100%", marginBottom:"2em"}} >
                                                                Delete
                                                                </Button>
                                                            </Popconfirm>
                                                            <h3 style={{color: "rgb(8, 105, 124)", fontFamily:"Arial"}}>Material information:</h3>
                                                        
                                                            <Form.Item 
                                                            
                                                            name={[name, 'key']}
                                                            label="Raw Material Code"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Raw Material Code is required"
                                                                },
                                                                ]}
                                                            >
                                                            <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                            name={[name, 'name']}
                                                            label="Name/Description"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Name and/or description is required"
                                                                },
                                                                ]}
                                                            >
                                                            <Input.TextArea style={{resize:"both"}}/>

                                                            </Form.Item>
                                                            
                                                            <Form.Item
                                                            name={[name, 'unit']}
                                                            label="Unit of Goods"
                                                            tooltip="Note: weight in kg"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                                ]}
                                                            >
                                                            <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                            name={[name, 'unit_price']}
                                                            label="Unit Price (AUD)"
                                                            rules={[
                                                                {
                                                                    type: 'number',
                                                                    min: 0,
                                                                    required: true,
                                                                },
                                                                ]}
                                                            >
                                                            <InputNumber min='0' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
                                                            </Form.Item>
                                                            <Form.Item
                                                            name={[name, 'coefficient']}
                                                            label="Quantity per Unit Dosage"
                                                            rules={[
                                                                {
                                                                    type: 'number',
                                                                    min: 0,
                                                                    required: true,
                                                                },
                                                                ]}
                                                            tooltip={coefficientTooltip}
                                                            >
                                                            <InputNumber min='0'/>
                                                            </Form.Item>


                                                            <Form.Item
                                                            name={[name, 'vendor_name']}
                                                            label="Vendor Company Name"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                                ]}
                                                            >
                                                            <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                            name={[name, 'vendor_email']}
                                                            label="Vendor Company Email"
                                                            rules={[
                                                                {
                                                                    type: 'email',
                                                                    required: true,
                                                                },
                                                                ]}
                                                            >
                                                            <Input />
                                                            </Form.Item>
                                                        </Paper>  
                                                    </Col>
                                                ))}
                                                <Col span={6.3}>
                                                    <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{marginTop:"1.5em", padding:"0 7.5em",fontSize:  'large', minHeight:"36em"}}>
                                                        Add Raw Material
                                                    </Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            </>
                                            )}
                                        </Form.List>
                                        <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                            <Button type="primary" htmlType="submit" style={{  position: "fixed", bottom: 500, right: 0}}>
                                                Submit
                                            </Button>
                                            <ScrollUpButton style={{width: "5%", height:"5"}} ToggledStyle={{right: "10%"}} />
                                        </Form.Item>
                                    </Col>
                                    </Row>

                            </Form>
                        
                    </Form.Provider>  
            
            </Content>
        </Layout>
    );
    
}
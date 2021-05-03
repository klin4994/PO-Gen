import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import API from '../utils/API'
import { Form, Input, InputNumber, Button, Space, Tooltip, Popconfirm, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined, DeleteFilled, InfoCircleOutlined } from '@ant-design/icons';

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
        

          return (
              
              //<Form {...layout} name="product-form" onFinish={onFinish} validateMessages={validateMessages}> 
        <Form.Provider> 
        <Form name="new-product-form" onFinish={onFinish} autoComplete="off" validateMessages={validateMessages}>
            
            <div className = "form-container">
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
                <InputNumber />
            </Form.Item>
            </div>
            <Form.List name="formulation">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key}  direction="vertical" className="form-container flex"  align="baseline">
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
                        <Space>
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
                        <InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
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
                        <InputNumber />
                        </Form.Item>
                        </Space>
                        <Space>
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
                        </Space>
                        <Popconfirm title={"Are you sure? "}onConfirm={() => remove(name)} okText="Yes" cancelText="No" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                            <Button type="primary" danger placement="right" icon={<DeleteFilled />} >
                            Delete
                            </Button>
                            
                        </Popconfirm>
                    </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: ""}}>
                        Add Raw Material
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    </Form.Provider>  

    );
    
}
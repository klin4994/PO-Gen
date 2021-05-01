import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
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
        },
      };
      let coefficientTooltip = 
      <span>
        Weight unit in mg. <br/>
        E.g.100mg per capsule, enter 100;<br/>
        <br/>
        For countable materials, divide by the dosage quantity in one package.<br/>
        E.g if 1 bottle per 20 capsules, enter 0.05;<br/>
      </span>
        const onFinish = (values) => {
            console.log(values);
          };

          return (
              //<Form {...layout} name="product-form" onFinish={onFinish} validateMessages={validateMessages}> 
        <Form.Provider> 
        <Form name="new-product-form" onFinish={onFinish} autoComplete="off" validateMessages={validateMessages}>
            
            <div class = "form-container">
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
                name={['product', 'qtyPerPacks']}
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
                        
                        {...restField}
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
                        {...restField}
                        name={[name, 'name']}
                        label="Name/Description"
                        rules={[
                            {
                                required: true,
                                message: "Name and/or description is required"
                            },
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        {...restField}
                        name={[name, 'unit']}
                        label="Unit of Goods"
                        rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                        {...restField}
                        name={[name, 'unit_price']}
                        label="Unit Price ($AUD)"
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
                        
                        <Form.Item
                        {...restField}
                        name={[name, 'coefficient']}
                        label="Quantity per unit dosage"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                required: true,
                            },
                            ]}
                        >
                        <Tooltip title = {coefficientTooltip} data-html="true">
                        <InputNumber />
                        <InfoCircleOutlined />
                        </Tooltip>
                        </Form.Item>
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
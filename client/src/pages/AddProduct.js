import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, InputNumber, Button, Space, Tooltip, Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined, DeleteFilled } from '@ant-design/icons';

export default function AddProduct () {
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
    // const validateMessages = {
        
    //     required: '${label} is required!',
    //     types: {
    //       email: '${label} is not a valid email!',
    //       number: '${label} is not a valid number!',
    //     },
    //     number: {
    //       range: '${label} must be between ${min} and ${max}',
    //     },
    //   };
   
        const onFinish = (values) => {
            console.log(values);
          };
        
          return (
              //<Form {...layout} name="product-form" onFinish={onFinish} validateMessages={validateMessages}> 
        <Form.Provider> 
        <Form name="new-product-form" onFinish={onFinish} autoComplete="off">

            <div class = "pt-container">
            <Form.Item
                name={['product', 'key']}
                label="Product Code"
            >
             <Input />
            </Form.Item>
            <Form.Item
                name={['product', 'qtyPerPack']}
                label="Name and Description"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['product', 'address']}
                label="Age"
                rules={[
                {
                    type: 'number',
                    min: 0,
                    max: 99,
                },
                ]}
            >
            <InputNumber />
            </Form.Item>
            <Form.Item name={['product', 'website']} label="Website">
                <Input />
            </Form.Item>
            <Form.Item name={['product', 'introduction']} label="Introduction">
                <Input.TextArea />
            </Form.Item>
            </div>
            <Form.List name="raw-material">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key}  direction="vertical" className="rm-form"  align="baseline">
                        <Form.Item 
                        
                        {...restField}
                        name={[name, 'info1']}
                        // fieldKey={[fieldKey, 'info1']}
                        //   name={[name, 'first']}
                        //   fieldKey={[fieldKey, 'first']}
                        //   rules={[{ required: true, message: 'Missing first name' }]}
                        >
                        <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                        
                        {...restField}
                        name={[name, 'info2']}
                        // fieldKey={[fieldKey, 'info2']}
                        //   name={[name, 'last']}
                        //   fieldKey={[fieldKey, 'last']}
                        //   rules={[{ required: true, message: 'Missing last name' }]}
                        >
                        <Input placeholder="Last Name" />
                        </Form.Item>

                        <Popconfirm title={"Are you sure? "}onConfirm={() => remove(name)} okText="Yes" cancelText="No" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                            <Button type="primary" danger placement="right" icon={<DeleteFilled />} >
                            Delete
                            </Button>
                            
                        </Popconfirm>
                    </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
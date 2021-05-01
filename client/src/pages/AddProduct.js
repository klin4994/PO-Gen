import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, InputNumber, Button } from 'antd';

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
              //<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}> 
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
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
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          );
    
}
import React from 'react'
import './index.css'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
export default function ({ onFinish, onFinishFailed, ...props }) {
  return (
    <>
      <Form
        name='basic'
        className='login-form'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: '2em', 
          marginTop: '3em',backgroundColor:"white", 
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"}}
      >  <div style={{ marginBottom: '1em' }}><strong style={{ color: 'rgb(8, 105, 124)', fontFamily: 'Arial', fontSize: '1.5em'}}>Login:</strong></div>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input style={{width:'90%', marginLeft:'5%'}} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            style={{width:'90%', marginLeft:'5%'}}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item />
        <Button type='primary' htmlType='submit' className='login-form-button' style={{width:'61.8%', marginLeft:'19.2%', marginTop:'0'}}>
          Log in
        </Button>
      </Form>
    </>
  )
}

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';

import LoginFormContainer from '../components/LoginForm';

export default function Login () {
      const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return <LoginFormContainer onFinish={onFinish} onFinishFailed={onFinishFailed}/>
    
}
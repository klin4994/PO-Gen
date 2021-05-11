import React, {useContext} from 'react';
import ReactDOM, {  useHistory, useLocation } from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import API from '../utils/API'
import LoginFormContainer from '../components/LoginForm';
import authContext from '../components/AuthContext';

export default function Login () {



    const onFinish = (loginData) => {

        API.login(loginData)
            .then((res) => {
              console.log(res);
            })
      console.log('Success:', loginData);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return <LoginFormContainer onFinish={onFinish} onFinishFailed={onFinishFailed}/>

}
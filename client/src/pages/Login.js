import React, {useContext} from 'react';
import ReactDOM, { useLocation } from 'react-dom';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import API from '../utils/API'
import LoginFormContainer from '../components/LoginForm';
import AuthContext from '../components/AuthContext';
import ProvideAuth from '../components/ProvideAuth';
export default function Login () {
     const history = useHistory();
     console.log(history)
    const { setIsAuthenticated } = useContext(AuthContext);
    async function onFinish (loginData) {
      
      // const loggedIn = await API.login(loginData)
      // const loggedUserId = loggedIn.data._id

      API.login(loginData)
        .then(response => {
          console.log(response)
          if (response.data._id) {
            setIsAuthenticated(true);
            history.push(history.location.pathname);
          } else {
            console.log("Error logging in");
          }
        }).catch(err => {
          console.log(err);
        }
        );
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return <LoginFormContainer onFinish={onFinish} onFinishFailed={onFinishFailed}/>

}
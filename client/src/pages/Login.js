import React, { useContext } from 'react'
import ReactDOM, { useLocation } from 'react-dom'
import { useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css'
import API from '../utils/API'
import LoginFormContainer from '../components/LoginForm'
import { Layout } from 'antd'

export default function Login () {
  const { Content } = Layout
  const history = useHistory()
  console.log(history)
  async function onFinish (loginData) {
    console.log('history', history)
    API.login(loginData)
      .then(response => {
        console.log(response)
        if (response.data._id) {
          history.go(history.location.pathname)
        } else {
          console.log('Error logging in')
        }
      }).catch(err => {
        console.log(err)
      }
      )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vh' }}>
      <Content style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
        background: '#fff'
      }}
      >
        <LoginFormContainer onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </Content>
    </Layout>
  )
}

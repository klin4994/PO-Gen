import React, { useContext } from 'react'
import { Menu, Layout } from 'antd'
import AuthContext from '../../utils/AuthContext'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
import {
  FileAddOutlined,
  PlusOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.css'

function Nav () {
  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext)
  const userLogOut = () => {
    API.logout()
    history.go(0)
  }
  const { Sider } = Layout

  const navItem = {
    margin: '10px'
  }
  const navItemText = {
    fontSize: '1.3rem',
    marginLeft: '5px'
  }
  const logo = {
    fontSize: '2.2rem',margin: '2rem 0.5rem 3rem 0.5rem'
  }

  return (
    <>
      <Sider
        style={{ position: 'fixed', zIndex: '2', height: '100vh', backgroundColor:'white' }}
        
        breakpoint='xxl'
        collapsedWidth='0'
        width='20em'
      >
        <Menu theme='light'  >
          <Menu.Item style={logo} title="To Generate PO">
            <a id='logo' style={{color:'rgb(8, 105, 124)'}} href='/'>PO Generator</a>
          </Menu.Item >
          <Menu.Item key='0' style={navItem} icon={<FileAddOutlined style={{fontSize: '1.3rem'}}/>}>
            <a style={navItemText} href='/'>Generate PO</a>
          </Menu.Item>
          <Menu.Item key='1' style={navItem} icon={<PlusOutlined style={{fontSize: '1.3rem'}}/>}>
            <a style={navItemText} href='/addproduct'>Add Product</a>
          </Menu.Item>

          {isAuthenticated
            ? <Menu.Item key='3' style={navItem} onClick={userLogOut} icon={<LogoutOutlined style={{fontSize: '1.3rem'}}/>}>
              <a style={navItemText} href='#' >Log Out</a>
            </Menu.Item>
            : <Menu.Item key='2' style={navItem} icon={<LoginOutlined />}>
              <a style={navItemText} href='/login' >Log In</a>
            </Menu.Item>}

        </Menu>
      </Sider>

    </>

  )
}

export default Nav

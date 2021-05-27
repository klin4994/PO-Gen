import React, { useContext } from 'react'
import { Menu, Layout } from 'antd'
import AuthContext from '../AuthContext'
import { useHistory } from 'react-router-dom'
import API from '../../utils/API'
function Nav () {
  const history = useHistory()
  const { isAuthenticated } = useContext(AuthContext)
  const userLogOut = () => {
    API.logout()
    history.go(0)
  }
  const { Sider } = Layout

  const navItem = {
    fontWeight: 'bold', fontSize: 'large'
  }
  return (
    <>

      <Sider
        style={{ position: 'fixed', zIndex: '2', height: '100vh' }}
        theme='dark'
        breakpoint='xxl'
        collapsedWidth='0'
      >
        <Menu theme='dark'>
          <h1 style={{ marginTop: '2em', color: '#13c2c2', fontFamily: 'Arial', minWidth: '10em' }}>PO Generator</h1>
          <Menu.Item key='0'>
            <a style={navItem} href='/'>Generate PO</a>
          </Menu.Item>
          <Menu.Item key='1'>
            <a style={navItem} href='/addproduct'>Add Product</a>
          </Menu.Item>

          {isAuthenticated
            ? <Menu.Item key='3' onClick={userLogOut}>
              <a style={navItem} href='#'>Log Out</a>
            </Menu.Item>
            : <Menu.Item key='2'>
              <a style={navItem} href='/login'>Log In</a>
            </Menu.Item>}

        </Menu>
      </Sider>

    </>

  )
}

export default Nav

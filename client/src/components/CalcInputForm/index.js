import React from 'react'
import { Button, Form, Select, InputNumber, message, Divider, Layout, Space, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import _ from 'lodash'
import Paper from '@material-ui/core/Paper'
import './index.css'
export default function CalcInputForm({products, currentProduct, onFinish}) {

    const layout = {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      }
      const tailLayout = {
        wrapperCol: {
          offset: 1,
          span: 5
        }
      }
    return (    
        <Form id='calc-input-wrapper' {...layout} onFinish={onFinish}>
        {/* input product information form */}
        <Row>
        <Col >
            <Paper id='calc-input-form' variant='outlined' style={{ padding: '1em 3em'}}>

            <br />
            <Col>
                <Row>
                <Col xxl={{ offset: 1 }} style={{ marginBottom: '1em' }}>
                    <strong style={{ color: 'rgb(8, 105, 124)', fontFamily: 'Arial', fontSize: '1.5em' }}>Enter product information below:</strong>
                    </Col>
                </Row>
                <Row>
                <Col offset={1} span={20}>
                    
                    <Form.Item {...tailLayout} label='Product code:' name='selectedPt' style={{ fontFamily: 'Arial' }}>
                            <Select
                                style={{ width: '14em' }}
                                dropdownMatchSelectWidth={false}
                                dropdownRender={menu => (
                                    <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div>
                                    <a style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} href='/addproduct'>
                                <PlusOutlined /> New Product
                                </a>
                                    </div>
                                    </div>
                                )}
                                placeholder='Select code'
                            >
                                {products.map(product => (
                                    <Select.Option key={product.key}>{product.key}</Select.Option>
                                ))}
                            </Select>
                            </Form.Item>
                    </Col>
                    </Row>
                    <Row>
                <Col offset={1} span={20}>
                    <Form.Item {...tailLayout} label='Package quantity:' name='selectedQty' tooltip='E.g for 5000 bottles/boxes of blisters, enter 5000.' style={{ fontFamily: 'Arial' }}>
                            <InputNumber placeholder='Enter Qty' min='0' style={{ width: '14em' }} />
                            </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col xxl={{ offset: 1 }} style={{display:'flex', justifyContent: 'center'}}>
                <Form.Item >
                <Button size='large' htmlType='submit' style={{  margin:"0 auto",  width: 'auto', backgroundColor: 'rgb(8, 105, 124)', color: 'white', borderColor: 'rgb(8, 105, 124)' }}>
                    Calculate
                        </Button>
                </Form.Item>
            </Col>
            <Col xxl={{ offset: 1 }}>
                {!_.isEmpty(currentProduct) ? <h2 style={{ fontFamily: 'Arial' }}><strong>Product selected:</strong> {currentProduct.name}</h2> : <></>}
            </Col>
            </Paper>
        </Col>
        </Row>
        </Form>
    )
}
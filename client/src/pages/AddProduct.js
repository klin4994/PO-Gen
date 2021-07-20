import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import API from '../utils/API'
import { Form, Input, InputNumber, Button, message, Popconfirm, Radio, Layout, Row, Col, Select } from 'antd'
import { PlusOutlined, QuestionCircleOutlined, DeleteFilled } from '@ant-design/icons'
import Paper from '@material-ui/core/Paper'
import ScrollUpButton from 'react-scroll-up-button'
import _ from 'lodash'

const { Content } = Layout
const { Option } = Select
export default function AddProduct () {
  useEffect(() => {
    loadVendors()
  }, [])

  // Set vendors
  const [vendors, setVendors] = useState([])
  async function loadVendors () {
    API.getVendors()
      .then(res => {
        setVendors(res.data)
      }
      )
      .catch(err => console.log(err))
  }
  const layout = {
    labelCol: {
      lg: { span: 9 },
      xl: { span: 6 }
    },
    wrapperCol: {
      span: 24
    }
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
      email: '${label} is not a valid email!'
    }
  }
  const coefficientTooltip = (
    <span>
      Weight unit in mg. <br />
      E.g.100mg per capsule, enter 100;<br />
      <br />
      For countable materials, divide by the dosage quantity in one package.<br />
      E.g if 1 bottle per 20 capsules, enter 0.05;<br />
    </span>
  )

  const onFinish = ({ product, formulation, ...rest }) => {
    message.success(`${product.key} has been successfully added!`, 6)
    // Initialize object to post
    product.user = '6093c20ad150a04ab444bc95'
    console.log(product)
    const mergeToPost = {
      ...product,
      formulation: formulation
    }

    // console.log(mergeToPost);
    API.addProduct(mergeToPost)

      .then(() => console.log('done!'))
      .catch(err => console.log(err))
  }

  return (

    <Layout >
      <Content style={{ marginTop: '3em' }}>
        <Form.Provider>
          <Form {...layout} name='new-product-form' onFinish={onFinish} autoComplete='off' validateMessages={validateMessages}>
            <Row>
              <Col span={12} offset={6}>
                {/* Product form */}
                <Paper variant='outlined' style={{ padding: '3em 6em' }}>
                  <Col style={{ marginBottom: '1em' }}>
                    <strong style={{ color: 'rgb(8, 105, 124)', fontFamily: 'Arial', fontSize: '1.5em', marginBottom: '2em' }}>Product information:</strong>
                  </Col>
                  <Form.Item
                    name={['product', 'key']}
                    label='Product Code'
                    rules={[
                              {
                                required: true
                              }
                            ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['product', 'name']}
                    label='Name/Desc'
                    rules={[
                              {
                                required: true
                              }
                            ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['product', 'packaging']}
                    label='Pakaging:'
                    rules={[
                              {
                                required: true
                              }
                            ]}
                  >
                    <Radio.Group defaultChecked='a' buttonStyle='solid'>
                              <Radio.Button value='a'>Bottle</Radio.Button>
                              <Radio.Button value='b'>Box (Blisters)</Radio.Button>
                            </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name={['product', 'dosageForm']}
                    label='Dosage Form'
                    rules={[
                              {
                                required: true
                              }
                            ]}
                  >
                    <Radio.Group defaultChecked='a' buttonStyle='solid'>
                              <Radio.Button value='a'>Tablet</Radio.Button>
                              <Radio.Button value='b'>Capsule</Radio.Button>
                            </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name={['product', 'qtyPerPack']}
                    label='Units per pack'
                    rules={[
                              {
                                type: 'number',
                                min: 0,
                                required: true
                              }
                            ]}
                  >
                    <InputNumber min='0' />
                  </Form.Item>

                  <Button htmlType='submit' size='large' htmlType='submit' style={{ fontSize: '1.4em', backgroundColor: 'rgb(8, 105, 124)', color: 'white', marginTop: '2em', borderColor: 'rgb(8, 105, 124)', height: '2.5em', width: '100%' }}>
                    Complete and Submit
                                            </Button>

                  {/* </div> */}
                </Paper>
              </Col>
            </Row>
            <Row>
              {/* Formulation form */}
              <Col span={12} offset={6}>
                <Row gutter={10}>

                  <Form.List name='formulation'>

                    {(fields, { add, remove }) => (
                              <>

                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                               <Col xs={{ span: 24 }} xxl={{ span: 12 }} key={key}>
                                        <Paper elevation={7} style={{ padding: '3em', marginTop: '2em', minWidth: '100%' }}>
                                                <Button type='primary' style={{ backgroundColor: '#139cc2', borderColor: '#139cc2' }} onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Raw Material
                                                        </Button>
                                                <Popconfirm title='Are you sure? ' onConfirm={() => remove(name)} okText='Yes' cancelText='No' icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                                        <Button type='primary' danger placement='right' icon={<DeleteFilled />} style={{ width: '100%', marginBottom: '2em' }}>
                                                            Delete
                                                                </Button>
                                                      </Popconfirm>
                                                <h3 style={{ color: 'rgb(8, 105, 124)', fontFamily: 'Arial' }}>Material information:</h3>

                                                <Form.Item

                                                        name={[name, 'key']}
                                                        label='Code'
                                                        rules={[
                                                            {
                                                              required: true,
                                                              message: 'Raw Material Code is required'
                                                            }
                                                          ]}
                                                      >
                                                        <Input />
                                                      </Form.Item>
                                                <Form.Item
                                                        name={[name, 'name']}
                                                        label='Name/Desc'
                                                        rules={[
                                                            {
                                                              required: true,
                                                              message: 'Name and/or description is required'
                                                            }
                                                          ]}
                                                      >
                                                        <Input.TextArea style={{ resize: 'both' }} />

                                                      </Form.Item>

                                                <Form.Item
                                                        name={[name, 'unit']}
                                                        label='PO Unit'
                                                        tooltip="This is the unit rendered on PO. If the unit is weight, please enter 'kg'"
                                                        rules={[
                                                            {
                                                              required: true
                                                            }
                                                          ]}
                                                      >
                                                        <Input />
                                                      </Form.Item>
                                                <Form.Item
                                                        name={[name, 'unit_price']}
                                                        label='Rate (AUD)'
                                                        rules={[
                                                            {
                                                              type: 'number',
                                                              min: 0,
                                                              required: true
                                                            }
                                                          ]}
                                                      >
                                                        <InputNumber min='0' formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                                      </Form.Item>
                                                <Form.Item
                                                        name={[name, 'coefficient']}
                                                        label='Qty/dose'
                                                        rules={[
                                                            {
                                                              type: 'number',
                                                              min: 0,
                                                              required: true
                                                            }
                                                          ]}
                                                        tooltip={coefficientTooltip}
                                                      >
                                                        <InputNumber min='0' />
                                                      </Form.Item>

                                                <Form.Item
                                                        name={[name, 'vendor_name']}
                                                        label='Vendor'
                                                        rules={[
                                                            {
                                                              required: true
                                                            }
                                                          ]}
                                                      >
                                                        <Select>
                                                            {_.map(vendors, vendor => (
                                                            <Option key={vendor.name}>{vendor.name}</Option>
                                                          ))}
                                                          </Select>
                                                      </Form.Item>
                                              </Paper>

                                      </Col>
                             ))}
                            <Col xs={{ span: 24 }} xxl={{ span: 12 }}>
                               <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ fontWeight: 'bold', color: '#139cc2', borderColor: '#139cc2' }}>
                                        Add Raw Material
                                                    </Button>
                             </Col>

                          </>
                            )}
                  </Form.List>

                </Row>
              </Col>
            </Row>
            <Row>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

                <ScrollUpButton style={{ width: '5%', height: '5', backgroundColor: 'rgb(8, 105, 124)' }} ToggledStyle={{ right: '10%' }} />
              </Form.Item>
            </Row>

          </Form>

        </Form.Provider>

      </Content>
    </Layout>
  )
}

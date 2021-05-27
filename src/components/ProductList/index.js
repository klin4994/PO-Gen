import React from 'react'
import { Button, Form, Select, InputNumber, Row, Col } from 'antd'

// export const ProductList =
export const ProductForm =
React.forwardRef((props, ref) => {
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <Row>
      <Form onFinish={(values) => { props.onclick(values.selectedPt, values.selectedQty) }}>
        <Col offset={12}>
          <Form.Item name='selectedPt'>
            <Select ref={ref}>
              {props.children.map(product => (
                <Select.Option key={product.key}>{product.key}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Form.Item name='selectedQty'>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>
            Calculate
          </Button>
        </Form.Item>
      </Form>
    </Row>

  )
})

export const ProductList =
React.forwardRef(({ children }, ref) => {
  return (
    <>
      <label htmlFor='select-product'><strong>Select Product: </strong></label>
      <select id='select-product' ref={ref} style={{ marginLeft: '0.5em', diplay: 'flex', flexDirection: 'row' }}>{children} </select>
    </>
  )
})

export function ProductListItem ({ children }) {
  return <option>{children.key}</option>
}

export const ProductQtyInput =
 React.forwardRef((props, ref) => {
   return (
     <div>
       <strong>Number of Packages:</strong><input id='productQty' ref={ref} style={{ marginLeft: '0.5em' }} />
     </div>
   )
 })

export function SetProductBtn (props) {
  return (
    <Button className='setProduct' {...props}>Calculate</Button>
  )
}

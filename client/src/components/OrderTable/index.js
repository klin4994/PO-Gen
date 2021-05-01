import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {InfoCircleOutlined} from '@ant-design/icons';
import { Tooltip,Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function ({children}) {
  console.log(children[0].formulation)
  const rawMaterials = children[0].formulation
    useEffect(() =>{
        setData(rawMaterials)
    },[children[0].formulation])
  console.log("table:", rawMaterials)
  const [form] = Form.useForm();
  const [data, setData] = useState(rawMaterials);
  const [editingKey, setEditingKey] = useState('');


  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        data.length = 0;
        data.push(newData)
        setEditingKey('');

      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'RM Code',
      dataIndex: 'key',
      width: '25%',
      editable: true,
    },
    {
      title: 'Details',
      dataIndex: 'coefficient',
      width: '5%',
      render: (cell,row, index) => {
        console.log(cell, row, index)
        let tooltipText = 
        <span>
        Conversion coefficient: {cell}<br/>
        Vendor: {row.vendor_name}<br/>
        </span>
        
        
        return (
        <Tooltip title = {tooltipText} data-html="true">
        <InfoCircleOutlined />
        </Tooltip>
        )
      },
    },
    {
      title: 'Name and Description',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    // {
    //   title: 'Order Quantity',
    //   dataIndex: 'vendor',
    //   width: '15%',
    //   editable: true,
    // },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      width: '15%',
      editable: true,
    },
    // {
    //   title: 'Unit',
    //   dataIndex: 'unit',
    //   width: '5%',
    //   editable: true,
    // },    
    {
      title: 'Coefficient',
      dataIndex: 'coefficient',
      width: '5%',
      editable: true,
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      width: '5%',
      editable: true,
    },
    {
      title: 'Details',
      dataIndex: 'vendor_name',
      width: '5%',
      render: (vendor_name) => {
        console.log(vendor_name)
        const tooltipText = 
        `
        Vendor: ${vendor_name}
        `
        
        return (
        <Tooltip title = {tooltipText}>
        <InfoCircleOutlined />
        </Tooltip>
        )
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
                color: "dodgerblue"
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel} okText="Yes" cancelText="No">
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{color: "dodgerblue"}}>
            Edit
          </Typography.Link>
          
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false} 
      />
      
    </Form>
  );
};


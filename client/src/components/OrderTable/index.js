import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {InfoCircleOutlined} from '@ant-design/icons';
import { Tooltip,Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import {useUpdateEffect} from "react-use"

export default function ({children}) {
  const [data, setData] = useState(children[0].formulation)
  useEffect (() => {
    setData(children[0].formulation)
  }, children)

  console.log(children)
  console.log(children[0].formulation)

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




  
  const [form] = Form.useForm();
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
        setData(newData)
        data.push(newData)
        setEditingKey('');

      } else {
        newData.push(row);
        setData(newData)
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
      width: '5%',
      editable: true,
      render: (key, row) => {
        
        return (
        <Tooltip title = {`Vendor: ${row.vendor_name}`}> {key}
        <InfoCircleOutlined />
        </Tooltip>
        )
      },
    },
    {
      title: 'Name and Description',
      dataIndex: 'name',
      width: '30',
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  console.log(data)
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


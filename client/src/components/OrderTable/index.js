import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {InfoCircleOutlined, EditTwoTone, FilePdfTwoTone, DeleteTwoTone} from '@ant-design/icons';
import { Tooltip,Table, Input, InputNumber, Popconfirm, Form, Typography, Select, Button } from 'antd';
import API from "../../utils/API"
import { jsPDF } from "jspdf";
import _ from "lodash";
import 'jspdf-autotable'

const {Option} = Select;

export default function ({children}) {
 console.log(children[0].currentProduct)
  const [data, setData] = useState(children[0].currentProduct.formulation)
  useEffect (() => {
    setData(children[0].currentProduct.formulation)
  }, children)

  // Get vendor names in an array
  const vendorArray = _.map(children[0].vendors, (vendor => {return _.pick(vendor, ['name', 'contact_email'])}))
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
        >
          {dataIndex === 'vendor_name'? 
          <Select>
            {_.map(vendorArray, (vendor => (
              <Option key={vendor.name}>{vendor.name}</Option>
            )))}
          </Select>:
          dataIndex === 'total_price' ? <InputNumber style={{width: '15em'}}/> : <Input/>
 
        }
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
      ...record,
    });
    setEditingKey(record.key);
  };
  // Current date

  // works with one product:
  // const newPdf = ({coefficient,vendor_email,vendor_name, ...rest}) => {
    const newPdf = (props) => {
      console.log(data)
      console.log(props)
      // Remove RMs with different vendor than the one clicked on, this allows all RMs to be printed on one PO
      const matchingKeyData = _.filter(data, ['vendor_name', props.vendor_name])
      // Pick out properties to be printed on the PO
      const pickedData = _.map(matchingKeyData, (rm => { return _.pick(rm, ['key','name', 'quantity', 'unit', 'unit_price', 'total_price'])}))     
      // Extract data values to arrays to populate on the PO
      const finalRowData = _.map(pickedData,(rm => {return _.map(rm,(value=> {return value}))}))   
      // Convert total_price from string to numbers
      const numberedTotalData = _.map(pickedData, rm => {return rm.total_price = Number(rm.total_price)})
      // Sum total price
      const reducer = (accumulator, item) => {
        return accumulator + item;
      };
      const sumPrice = numberedTotalData.reduce(reducer)
      // Push the total price as the last row of the table
      finalRowData.push(['','','','','Total All',sumPrice.toFixed(2)])

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    // Initialize pdf
  const doc = new jsPDF();
doc.addImage("examples/images/Octonyan.jpg", "JPEG", 20, 12, 23, 23); 
doc.setFontSize(22);
doc.text("My Company Name Pty Ltd", 55, 19, null, null, "left");
doc.setFontSize(16);
doc.text("23 Company St, Suburb, NSW, Australia", 55, 27, null, null, "left");
doc.text("myemail@company.com", 55, 35, null, null, "left");
doc.line(17, 37, 188,37)


doc.setFont("helvetica", "bold");
doc.text("To:", 25, 45);
doc.setFont("helvetica", "normal");

  doc.text(props.vendor_name, 25, 53);
  
  // let vendorEmail;

  // vendorArray.forEach(vendor => {
  //   console.log(vendor)
  //   console.log(props.vendor_name)
  //   console.log(vendor.contact_email)
  //   if (vendor.name === props.vendor_name) {
  //     console.log(vendor.contact_email)
  //     return vendorEmail = vendor.contact_email;
  //   };
  // });

  // console.log(vendorEmail)
  // doc.text(vendorEmail, 25, 61);

  doc.text(`Order date: ${today}`, 110, 45);
  doc.text("PO #: 12345678", 110, 53);

  doc.autoTable({
    head: [['Our Ref', 'Name', 'Quantity', 'Unit', 'Rate', 'Total Price']],
    margin: { top: 65 , left: 20.2, right: 22.4},
    columnStyles: { 
      0: { halign: 'center', minCellWidth: 8 }, 
      1: { halign: 'center', minCellWidth: 30},
      2: { halign: 'center', minCellWidth: 10},
      3: { halign: 'center', minCellWidth: 5},
      4: { halign: 'center', minCellWidth: 10},
      5: { halign: 'right'}
    },
    footStyles: {fillColor:[255, 0, 0]},
    body: finalRowData,
  })


    // Open document in new tab
    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
    
  }

  const cancel = () => {
    setEditingKey('');
  };
  
  // Save new record
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      // find the index of the modified value
      const index = newData.findIndex((item) => key === item.key);
      // replace the properties with the new values
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
      // If new row of data, add it to the original data set
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // Remove a raw material from the data and set new state for data
  const remove = (row) => {
    // remove by matching key
    const removedData = data.filter(e => e.key != row.key);
    setData(removedData)
  }

  const columns = [
    {
      title: 'RM Code',
      dataIndex: 'key',
      width: '10%',
      editable: true,
      render: (key, row) => {
        return (
        <Tooltip title = {`Coefficient: ${row.coefficient}`}> {key}
        <InfoCircleOutlined />
        </Tooltip>
        )
      },
    },
    {
      title: 'Name and Description',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '10%',
      editable: true,
      align:'right'
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: '5%',
      editable: true,
      align:'right'
    },   
    {
      title: 'Rate',
      dataIndex: 'unit_price',
      width: '10%',
      editable: true,
      align:'right'
    },
 
    {
      title: 'Total Price (AUD)',
      dataIndex: 'total_price',
      inputType: 'number',
      width: '10%',
      editable: true,
      align:'right'
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '15%',
      fixed: 'right',
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
          <span>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{color: "dodgerblue"}}>
            <Tooltip title = {'Edit row'}>
              <EditTwoTone twoToneColor="orange" style={{fontSize:"1.5em", paddingRight:"0.5em"}}/>
            </Tooltip>
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ''}  onClick={() => newPdf(record)} style={{color: "dodgerblue"}}>
            <Tooltip title = {'Generate PDF'}>
              <FilePdfTwoTone twoToneColor="blue" style={{fontSize:"1.5em", paddingRight:"0.5em"}} />
            </Tooltip>
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ''} style={{color: "dodgerblue"}}>
            <Popconfirm title="Remove this row?" onConfirm={() => remove(record)} okText="Confirm" cancelText="Cancel">
              <Tooltip title = {'Delete row'}>
                <DeleteTwoTone twoToneColor="red" style={{fontSize:"1.5em", }}/>
              </Tooltip>
            </Popconfirm>
          </Typography.Link>
          </span>
);
      },
    },
  ];
  const logVendor = (value) => {
    console.log(value)
  }
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
  return (
    
    <Form form={form} component={false}>
      <Table id="results_table"
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
        style={{zIndex:"-1"}}
      />
    </Form>
    
  );
};


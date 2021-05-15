import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {InfoCircleOutlined} from '@ant-design/icons';
import { Tooltip,Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import AllProductsContext from '../AllProductsContext'
import { jsPDF } from "jspdf";
import _ from "lodash";
import 'jspdf-autotable'

export default function ({children}) {
  const allProducts = useContext(AllProductsContext);
  console.log(children)
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
      console.log(matchingKeyData)
      // Pick out properties to be printed on the PO
      const pickedData = _.map(matchingKeyData, (rm => { return _.pick(rm, ['key','name', 'unit_price', 'unit', 'total_price'])}))
      console.log(pickedData)
      
      // Extract data values to arrays to populate on the PO
      const finalRowData = _.map(pickedData,(rm => {return _.map(rm,(value=> {return value}))}))   
      // Convert total_price from string to numbers
      const numberedTotalData = _.map(pickedData, rm => {return rm.total_price = Number(rm.total_price)})
      console.log(finalRowData)
      // Sum total price
      const reducer = (accumulator, item) => {
        return accumulator + item;
      };
      const sumPrice = numberedTotalData.reduce(reducer)
      // Push the total price as the last row of the table
      finalRowData.push(['','','','Total All',sumPrice.toFixed(2)])

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
  // console.log([rest])
  // _.update(rest, 'unit_price',
  //   function (price) {return JSON.stringify(price)})
  //   console.log([rest])
  const doc = new jsPDF();
  doc.rect(20, 10, 168, 275);

  doc.text("Company name", 45, 15, null, null, "left");
  doc.text("Address", 45, 20, null, null, "left");
  doc.text("Email", 45, 25, null, null, "left");
  doc.line(20, 30, 188,30)


  doc.setFont("helvetica", "bold");
  doc.text("To:", 20, 35);
  doc.setFont("helvetica", "normal");
  doc.text(props.vendor_name, 20, 40);
  doc.text(props.vendor_email, 20, 45);

  doc.text(`Order date: ${today}`, 110, 35);
  doc.text("PO #: 12345678", 110, 40);


  // function createHeaders(keys) {
  // var result = [];
  // for (var i = 0; i < keys.length; i += 1) {
  //   result.push({
  //     id: keys[i],
  //     name: keys[i],
  //     prompt: keys[i],
  //     width: 65,
  //     align: "center",
  //     padding: 0
  //   });
  // }
  // return result;
  // }

  // var headers = createHeaders([ 
  // "key",
  // "name",
  // "unit_price",
  // "unit",
  // "total_price",

  // ]);

  // doc.table(45, 60, [rest], headers,{printHeaders:true, autoSize: true, fontSize:12});
  doc.autoTable({
    head: [['Code', 'Name', 'Unit Price', 'Unit', 'Total Price']],
    margin: { top: 60 , left: 20.2, right: 22.2},
    columnStyles: { 
      0: { halign: 'center', minCellWidth: 8 }, 
      1: { halign: 'center', minCellWidth: 30},
      2: { halign: 'center', minCellWidth: 10},
      3: { halign: 'center', minCellWidth: 5},
      4: { halign: 'center'}
    },
    footStyles: {fillColor:[255, 0, 0]},
    // startY: number = null,
    body: finalRowData,
  })

  //   // console.log(record)
  //   // doc.text(JSON.stringify(record.coefficient).replace(/['"]+/g, ''), 10, 10);
  //   // // doc.text(JSON.stringify(record.key), 10, 10);
  //   // // doc.text(JSON.stringify(record.name), 10, 10);
  //   // // doc.text(JSON.stringify(record.total_price), 10, 10);
  //   // // doc.text(JSON.stringify(record.unit), 10, 10);
  //   // // doc.text(JSON.stringify(record.unit_price), 10, 10);
  //   // // doc.text(JSON.stringify(record.vendor_email), 10, 10);
  //   // // doc.text(JSON.stringify(record.vendor_name), 10, 10);

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
      console.log("NewDate", newData);
      // find the index of the modified value
      const index = newData.findIndex((item) => key === item.key);
      // replace the properties with the new values
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setData(newData)
      data.push(newData)
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // Remove a raw material from the data and set new state for data
  const remove = (row) => {
    console.log(row)
    console.log(data)
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
      width: '35%',
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
      width: '10%',
      editable: true,
    },
    // {
    //   title: 'Unit',
    //   dataIndex: 'unit',
    //   width: '5%',
    //   editable: true,
    // },    
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      width: '10%',
      editable: true,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      width: '20%',
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
          <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{color: "dodgerblue"}}>
            Edit
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ''} onClick={() => newPdf(record)} style={{color: "dodgerblue"}}>
            Generate PDF
          </Typography.Link>
          <Typography.Link disabled={editingKey !== ''} style={{color: "dodgerblue"}}>
            <Popconfirm title="Sure to cancel?" onConfirm={() => remove(record)} okText="Yes" cancelText="No">
              Remove
            </Popconfirm>
          </Typography.Link>
          </>
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
      />
      
    </Form>
    
  );
};


import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function AddRmFormBtn () {
  return (
    <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />} style={{ width: '' }}>
      Add Raw Material
    </Button>
  )
}

import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Form, Input } from 'antd';

interface Props {
  form: FormInstance;
}

const ItemInfo = ({ form }: Props) => {
  return (
    <Form form={form} layout='vertical'>
      <Form.Item
        name='name'
        label='Name'
        rules={[
          { required: true, message: "Please enter the new item's name." },
        ]}
      >
        <Input placeholder='Item name...' />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <Input.TextArea placeholder='Item description...' />
      </Form.Item>
    </Form>
  );
};

export default ItemInfo;

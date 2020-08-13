import React from 'react';
import { Form, Input, Modal } from 'antd';

const NewAddItemModal = () => {
  return (
    <Modal title='Add a New Item' okText='Create'>
      <Form>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: "Please enter the item's name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewAddItemModal;

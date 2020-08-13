import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../../../store';
import {
  createItem,
  setAddItemModalState,
} from '../../../../../../../services/items';

const NewAddItemModal = () => {
  const dispatch = useDispatch();

  const visible = useSelector(
    (state: ApplicationState) => state.items.addItemModalState,
  );

  const [form] = Form.useForm();

  return (
    <Modal
      title='Add a New Item'
      visible={visible}
      okText='Create'
      onOk={() => {
        form.submit();
        dispatch(setAddItemModalState(false));
      }}
      onCancel={() => dispatch(setAddItemModalState(false))}
    >
      <Form form={form} onFinish={(values) => dispatch(createItem(values))}>
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

import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../../../store';
import { setAddItemModalState } from '../../../../../../../services/items';

const NewAddItemModal = () => {
  const visible = useSelector(
    (state: ApplicationState) => state.items.addItemModalState,
  );
  const dispatch = useDispatch();

  return (
    <Modal
      title='Add a New Item'
      visible={visible}
      okText='Create'
      onCancel={() => dispatch(setAddItemModalState(false))}
    >
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

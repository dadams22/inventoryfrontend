import React from 'react';
import { Modal } from 'antd';

const renderNewAddItemModal = () => {
  Modal.confirm({
    title: 'Add a New Item',
    content: 'works',
    okText: 'Create',
  })
};

export default renderNewAddItemModal;
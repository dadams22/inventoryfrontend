import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { ApplicationState, InventoryItem } from '../../services/types';
import SearchBar from '../../components/SearchBar';
import AddNewItem from '../../components/AddNewItem';

function Inventory() {
  const items = useSelector((state: ApplicationState) => state.items);
  const [searchValue, setSearchValue] = useState('');
  const [isAddNewItemVisible, setAddNewItemVisible] = useState(false);

  const dataSource = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((item) => ({ ...item, key: item.id }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.name.localeCompare(b.name),
      render: (name: string, record: InventoryItem) => (
        <Link to='/inventory'>{name}</Link>
      ),
    },
    {
      title: 'Weight (lbs.)',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a: InventoryItem, b: InventoryItem) => a.weight - b.weight,
    },
  ];

  return (
    <>
      <Row>
        <Col span={4} offset={3}>
          <SearchBar
            searchValue={searchValue}
            onChange={setSearchValue}
            placeholder='Search items by name...'
          />
        </Col>
        <Col span={3} offset={11}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            style={{ float: 'right' }}
            onClick={() => setAddNewItemVisible(true)}
          >
            Add a New Item
          </Button>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={18}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
      <Modal
        title='Add new item'
        visible={isAddNewItemVisible}
        onCancel={() => setAddNewItemVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setAddNewItemVisible(false)}>
            Cancel
          </Button>
        ]}
      >
        <AddNewItem closeModal={() => setAddNewItemVisible(false)} />
      </Modal>
    </>
  );
}

export default Inventory;

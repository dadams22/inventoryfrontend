import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SearchBar from '../../../../components/SearchBar';
import AddItemModal from './components/AddItemModal';
import { ApplicationState } from '../../../../store';
import {
  fetchItems,
  InventoryItem,
  setAddItemModalState,
} from '../../../../services/items';

function Inventory() {
  const items = useSelector((state: ApplicationState) => state.items.items);

  const dispatch = useDispatch();
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  });

  const [searchValue, setSearchValue] = useState('');

  const dataSource = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((item) => ({ ...item, key: item.id }));

  const columns: ColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.name.localeCompare(b.name),
      render: (name: string) => <Link to='/inventory'>{name}</Link>,
    },
    {
      title: 'Date Stocked',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.created_at.localeCompare(b.created_at),
    },
    {
      title: 'Weight (lbs.)',
      dataIndex: 'weight',
      key: 'weight',
      align: 'right',
      sorter: (a: InventoryItem, b: InventoryItem) => a.weight - b.weight,
      render: (weight: number) => weight.toFixed(2),
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
            onClick={() => dispatch(setAddItemModalState(true))}
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
      <AddItemModal />
    </>
  );
}

export default Inventory;

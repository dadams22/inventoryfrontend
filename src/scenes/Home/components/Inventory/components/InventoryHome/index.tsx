import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Button, Col, Row, Table, Tag, Dropdown, Menu, Modal } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import SearchBar from '../../../../../../components/SearchBar';
import AddItemModal from '../AddItemModal';
import { ApplicationState } from '../../../../../../store';
import {
  deleteItem,
  InventoryItem,
  setAddItemModalState,
} from '../../../../../../services/items';
import { fetchScales } from '../../../../../../services/scales';
import { itemsSelectors } from '../../../../../../services/selectors';

function InventoryHome() {
  const dispatch = useDispatch();
  const items = useSelector(itemsSelectors.selectAll);
  const fetching = useSelector(
    (state: ApplicationState) => state.items.fetching,
  );

  const [searchValue, setSearchValue] = useState('');

  const dataSource = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    .map((item) => ({ ...item, key: item.id }));

  const renderDeleteItemConfirm = (item: InventoryItem) =>
    Modal.confirm({
      title: `Are you sure you want to delete ${item.name}?`,
      content:
        'Deleting an item causes all data collected for that item to be permanently deleted',
      okText: 'Delete',
      onOk: () => dispatch(deleteItem(item.id)),
    });

  const columns: ColumnProps<any>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.name.localeCompare(b.name),
      render: (name: string, item: InventoryItem) => (
        <Link to={`/inventory/${item.id}`}>{name}</Link>
      ),
    },
    {
      title: 'Date Stocked',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: InventoryItem, b: InventoryItem) =>
        a.created_at.localeCompare(b.created_at),
      render: (created_at: string) => created_at.slice(0, 10),
    },
    {
      title: 'Linked Scales',
      dataIndex: 'scales',
      key: 'scales',
      render: (scales: number[]) =>
        scales.map((scale) => <Tag key={scale}>{scale}</Tag>),
    },
    {
      title: 'Weight (lbs.)',
      dataIndex: 'last_measurement',
      key: 'last_measurement',
      align: 'right',
      sorter: (a: InventoryItem, b: InventoryItem) => {
        const weightA = _.get(a, 'last_measurement.value', -1);
        const weightB = _.get(b, 'last_measurement.value', -1);
        return weightA - weightB;
      },
      render: (measurement?: { value: number; timestamp: string }) => {
        const value = _.get(measurement, 'value');
        return value ? value.toFixed(2) : '';
      },
    },
    {
      key: 'actions',
      align: 'right',
      render: (item: InventoryItem) => {
        const actions = (
          <Menu>
            <Menu.Item>
              <Link to={`/inventory/${item.id}`}>View Details</Link>
            </Menu.Item>
            <Menu.Item onClick={() => renderDeleteItemConfirm(item)}>
              Delete Item
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={actions}>
            <EllipsisOutlined />
          </Dropdown>
        );
      },
    },
  ];

  // TODO: change this to something application-wide
  const spacedRowStyle = { marginTop: '10px' };

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
            onClick={() => {
              dispatch(setAddItemModalState(true));
              // TODO: move this somewhere else, probably to an epic
              dispatch(fetchScales());
            }}
          >
            Add a New Item
          </Button>
        </Col>
      </Row>
      <Row justify='center' style={spacedRowStyle}>
        <Col span={18}>
          <Table dataSource={dataSource} columns={columns} loading={fetching} />
        </Col>
      </Row>
      <AddItemModal />
    </>
  );
}

export default InventoryHome;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';
import SearchBar from '../../../../components/SearchBar';
import { Scale } from '../../../../services/scales';
import { scalesSelectors } from '../../../../services/selectors';
import ScalesStatusChart from './components/ScalesStatusChart';
import ScalesUsageSummary from './components/ScalesUsageSummary';

function Scales() {
  const scales = useSelector(scalesSelectors.selectAll);

  const [searchValue, setSearchValue] = useState('');

  const dataSource = scales
    .filter((scale) => String(scale.id).includes(searchValue.toLowerCase()))
    .map((scale) => ({ ...scale, key: scale.id }));

  const columns: ColumnProps<Scale>[] = [
    {
      title: 'Scale ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Availability',
      dataIndex: 'item',
      key: 'item',
      sorter: (a, b) => Number(a.item !== null) - Number(b.item !== null),
      render: (item: number) =>
        item === null ? (
          <Tag color='green'>Available</Tag>
        ) : (
          <Tag color='blue'>In Use</Tag>
        ),
    },
  ];

  // TODO: refactor this and the items scene to use the same code for this
  const spacedRowStyle = { marginTop: '10px' };

  return (
    <>
      <Row gutter={8}>
        <Col span={12} offset={3}>
          <ScalesStatusChart />
        </Col>
        <Col span={6}>
          <ScalesUsageSummary />
        </Col>
      </Row>
      <Row style={spacedRowStyle}>
        <Col span={6} offset={3}>
          <SearchBar
            searchValue={searchValue}
            onChange={setSearchValue}
            placeholder='Search scales by id...'
          />
        </Col>
      </Row>
      <Row justify='center' style={spacedRowStyle}>
        <Col span={18}>
          <Table dataSource={dataSource} columns={columns} size='middle' />
        </Col>
      </Row>
    </>
  );
}

export default Scales;

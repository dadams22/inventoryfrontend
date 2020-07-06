import React, { useState } from 'react';
import { Col, Row, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import { Scale } from '../../../../services/scales';
import { scalesSelectors } from '../../../../services/selectors';

function Scales() {
  const scales = useSelector(scalesSelectors.selectAll);

  const [searchValue, setSearchValue] = useState('');

  const dataSource = scales
    .filter((scale) => String(scale.id).includes(searchValue.toLowerCase()))
    .map((scale) => ({ ...scale, key: scale.id }));

  const columns = [
    {
      title: 'Scale ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Scale, b: Scale) => a.id - b.id,
    },
    {
      title: 'Availability',
      dataIndex: 'item',
      key: 'item',
      sorter: (a: Scale, b: Scale) =>
        Number(a.item !== null) - Number(b.item !== null),
      render: (item: number) =>
        item === null ? <Tag color='green'>Available</Tag> : <Tag>In Use</Tag>,
    },
  ];

  // TODO: refactor this and the items scene to use the same code for this
  const spacedRowStyle = { marginTop: '10px' };

  return (
    <>
      <Row style={spacedRowStyle}>
        <Col span={4} offset={3}>
          <SearchBar
            searchValue={searchValue}
            onChange={setSearchValue}
            placeholder='Search scales by id...'
          />
        </Col>
      </Row>
      <Row justify='center' style={spacedRowStyle}>
        <Col span={18}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </>
  );
}

export default Scales;

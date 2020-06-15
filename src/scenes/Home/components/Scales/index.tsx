import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../../components/SearchBar';
import { ApplicationState } from '../../../../store';
import { fetchScales, Scale } from '../../../../services/scales';

function Scales() {
  const scales = useSelector((state: ApplicationState) => state.scales.scales);

  const dispatch = useDispatch();
  useEffect(() => {
    if (scales.length === 0) {
      dispatch(fetchScales());
    }
  });

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
        Number(Boolean(a.item)) - Number(Boolean(b.item)),
      render: (item: number) =>
        item === null ? <Tag>In Use</Tag> : <Tag color='green'>Available</Tag>,
    },
  ];

  return (
    <>
      <Row>
        <Col span={4} offset={3}>
          <SearchBar
            searchValue={searchValue}
            onChange={setSearchValue}
            placeholder='Search scales by id...'
          />
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={18}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </>
  );
}

export default Scales;

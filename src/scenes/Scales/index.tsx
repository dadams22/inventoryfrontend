import React, {useState} from 'react'
import {Col, Row, Table, Tag} from "antd";
import SearchBar from "../../components/SearchBar";
import {useSelector} from "react-redux";
import {ApplicationState, Scale} from "../../services/types";

function Scales() {
    const scales = useSelector((state: ApplicationState) => state.scales);
    const [searchValue, setSearchValue] = useState('');

    const dataSource = scales
        .filter(scale => String(scale.id).includes(searchValue.toLowerCase()))
        .map(scale => ({ ...scale, key: scale.id }));

    const columns = [
        {
            title: 'Scale ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: Scale, b: Scale) => a.id - b.id,
        },
        {
            title: 'Availability',
            dataIndex: 'inUse',
            key: 'inUse',
            sorter: (a: Scale, b: Scale) => Number(a.inUse) - Number(b.inUse),
            render: (inUse: boolean) => inUse ? <Tag>In Use</Tag> : <Tag color={'green'}>Available</Tag>,
        },
    ];

    return (
        <>
            <Row>
                <Col span={4} offset={3}>
                    <SearchBar
                        searchValue={searchValue}
                        onChange={setSearchValue}
                        placeholder={'Search scales by id...'}
                    />
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={18}>
                    <Table dataSource={dataSource} columns={columns}/>
                </Col>
            </Row>
        </>
    )
}

export default Scales;
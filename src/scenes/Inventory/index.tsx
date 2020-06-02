import React, {useState} from 'react';
import {ApplicationState, InventoryItem} from "../../services/types";
import {useSelector} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import {Link} from "react-router-dom";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';

function Inventory() {
    const items = useSelector((state: ApplicationState) => state.items);
    const [searchValue, setSearchValue] = useState('');

    const dataSource = items
        .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map(item => ({...item, key: item.id}));

    const columns = [
        {
            title: 'Name',
            dataIndex:'name',
            key: 'name',
            sorter: (a: InventoryItem, b: InventoryItem) => a.name.localeCompare(b.name),
            render: (name: string, record: InventoryItem) => <Link to={`/inventory`}>{name}</Link>
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            sorter: (a: InventoryItem, b: InventoryItem) => a.weight - b.weight
        },
    ];

    return (
        <>
            <Row>
                <Col span={4} offset={3}>
                    <Input
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder={'Search items by name...'}
                        prefix={<SearchOutlined/>}
                    />
                </Col>
                <Col offset={10}>
                    <Button type={'primary'} icon={<PlusOutlined/>}>Add a New Item</Button>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={18}>
                    <Table dataSource={dataSource} columns={columns} />
                </Col>
            </Row>
        </>
    );
}

export default Inventory;
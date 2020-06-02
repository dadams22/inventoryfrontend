import React from 'react';
import {ApplicationState, InventoryItem} from "../../services/types";
import {useSelector} from "react-redux";
import {Col, Row, Table} from "antd";
import {Link} from "react-router-dom";

function Inventory() {
    const items = useSelector((state: ApplicationState) => state.items);

    const dataSource = items.map(item => ({...item, key: item.id}));
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
        <Row justify={'center'}>
            <Col span={18}>
                <Table dataSource={dataSource} columns={columns} />
            </Col>
        </Row>
    );
}

export default Inventory;
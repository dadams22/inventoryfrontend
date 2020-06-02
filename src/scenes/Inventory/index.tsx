import React from 'react';
import {ApplicationState, InventoryItem} from "../../services/types";
import {useSelector} from "react-redux";
import {Col, Row, Table} from "antd";

function Inventory() {
    const items = useSelector((state: ApplicationState) => state.items);

    const dataSource = items.map(item => ({...item, key: item.id}));
    const columns = [
        {
            title: 'Name',
            dataIndex:'name',
            key: 'name',
            sorter: (a: InventoryItem, b: InventoryItem) => a.name.localeCompare(b.name)
        },
        { title: 'Weight', dataIndex: 'weight', key: 'weight', },
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
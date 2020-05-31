import React from 'react';
import { Menu } from "antd";

function NavigationBar() {
    return (
        <Menu mode={'horizontal'}>
            <Menu.Item key={'inventory'}>Inventory</Menu.Item>
            <Menu.Item key={'scales'}>Scales</Menu.Item>
        </Menu>
    )
}

export default NavigationBar;
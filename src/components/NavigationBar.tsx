import React from 'react';
import { Menu } from "antd";
import { Link } from "react-router-dom";

function NavigationBar() {
    const tabs = [
        { name: 'Inventory', path: '/inventory' },
        { name: 'Scales', path: 'scales'}
    ];

    return (
        <Menu mode={'horizontal'}>
            {tabs.map(tab => (
                <Menu.Item key={tab.name}>
                    <Link to={tab.path}>{tab.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default NavigationBar;
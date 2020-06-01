import React from 'react';
import { Menu } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const NavigationBar = ({
    location
}: RouteComponentProps) => {
    const tabs = [
        { name: 'Inventory', path: '/inventory' },
        { name: 'Scales', path: '/scales'}
    ];

    const selectedKeys = tabs
        .filter(tab => tab.path === location.pathname)
        .map(tab => tab.name);

    return (
        <Menu mode={'horizontal'} selectedKeys={selectedKeys}>
            {tabs.map(tab => (
                <Menu.Item key={tab.name}>
                    <Link to={tab.path}>{tab.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    )
};

export default withRouter(NavigationBar);
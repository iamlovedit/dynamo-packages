import React from "react";
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalOutlined, SearchOutlined } from '@ant-design/icons';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname.length > 1 ? location.pathname.slice(1) : location.pathname;
    const items = [
        {
            label: '主页',
            key: '/',
            icon: <GlobalOutlined />
        },
        {
            label: '搜索',
            key: 'search',
            icon: <SearchOutlined />,
        }
    ]
    function handleClick(event: any) {
        navigate(event.key, {
            replace: false,
        }
        );
    }
    return (
        <Menu items={items} mode="horizontal"
            style={{ textAlign: "center", display: "block" }}
            theme="dark" defaultSelectedKeys={[pathname]}
            multiple={false}
            onClick={(event) => handleClick(event)}
        />
    )
}

export default Header
import React, { useMemo, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, AppstoreOutlined, UnorderedListOutlined, LoginOutlined} from '@ant-design/icons';
import './style.scss'

export const Layout = () => {
  const [current, setCurrent] = useState('mail');

  const items: MenuProps['items'] = useMemo(() => {
    return  [
      {
        label: <Link to='/'>Home</Link>,
        key: 'home',
        icon: <MailOutlined />,
      },
      {
        label: <Link to='/list'>List</Link>,
        key: 'list',
        icon: <UnorderedListOutlined />
      },
      {
        label: <Link to='/login'>Login</Link>,
        key: 'login',
        icon: <LoginOutlined />,
      },
      {
        label: <Link to='/register'>Register</Link>,
        key: 'register',
        icon: <AppstoreOutlined />,
      }
    ]
  }, []);

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  }

  return (
    <div className="main-layout">
      <nav id='nav-bar'>
        <Menu onClick={handleClickMenu} selectedKeys={[current]} mode="horizontal" items={items} />
      </nav>
      <Outlet />
    </div>
  )
}

import React, { useMemo, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, LogoutOutlined, UnorderedListOutlined, LoginOutlined} from '@ant-design/icons';
import './style.scss'

export const Layout = () => {
  const [current, setCurrent] = useState('mail');
  const user = localStorage.getItem("jwt")|| '{}';
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href='/login';
  };

  const handleProfile = () => {
    
    window.location.href='/profile';
  };

  const items: MenuProps['items'] = useMemo(() => {

    if (user){
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
        label: <button className="btn-logout"  onClick={handleProfile}>
           <LogoutOutlined />ㅤProfile     
        </button>,
        key: 'profile',
        
      },
      {
        label: <button className="btn-logout"  onClick={handleLogout}>
           <LogoutOutlined />ㅤLogout     
        </button>,
        key: 'logout',
        
      },
    ]}
  
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

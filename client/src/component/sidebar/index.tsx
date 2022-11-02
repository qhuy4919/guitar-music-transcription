import React from 'react'
import { Button, Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import Icon, {
    UserOutlined,
    LineChartOutlined,
    GiftOutlined,
    WalletOutlined,
    HistoryOutlined,
    QrcodeOutlined,
    MessageOutlined,
    LeftOutlined,
    CheckCircleOutlined,
    RightOutlined,
    SettingOutlined,
} from '@ant-design/icons'

import 'antd/dist/antd.min.css'
import 'component/siderbar/style.scss'

const siderWidth = 200
const minimizeSiderWidth = 80

const RenderMenu = () => {
    // const { user } = useAuth()
    // const { collapsed, setCollapsed } = useAuth()
    // const defaultSelectedKey = localStorage.getItem('selected_sidebar_key')

    // const toggleCollapsed = () => {
    //     localStorage.setItem('collapsed', !collapsed)
    //     setCollapsed(!collapsed)
    // }
    // const { Sider } = Layout

    // const onClickLink = (e, url = '/') => {}

    // const handleSelectItem = (e) => {
    //     localStorage.setItem('selected_sidebar_key', e.key)
    // }

    const UserMenu = (
        <>
            <Menu.Item
                key="1"
                // icon={<Icon component={sidebarIcons.vehicleSgv} />}
            >
                <Link className="sider-bar__link" to="/vehicles">
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                // icon={<Icon component={sidebarIcons.parkingLotSgv} />}
            >
                <Link className="sider-bar__link" to="/parking-lots">
                    Danh sách bài hát
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<GiftOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/packages">
                    Feedback
                </Link>
            </Menu.Item>
        </>
    )

    const adminMenu = (
        <>
            <Menu.Item
                key="1"
                icon={<UserOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/accounts">
                    Quản lí tài khoản user
                </Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<CheckCircleOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/verify-request">
                    Quản lí bài hát
                </Link>
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<WalletOutlined className="menu-item-icon" />}
            >
                <Link className="sider-bar__link" to="/wallets">
                    Quản lí feedback
                </Link>
            </Menu.Item>
        </>
    )

    return (
        <div></div>
//         <Layout className="layout-container">
//             <Sider
//                 width={collapsed ? minimizeSiderWidth : siderWidth}
//                 className="sider-bar"
//                 trigger={null}
//                 collapsible
//                 collapsed={collapsed}
//             >
//                 <Link to="/" onClick={(e) => onClickLink(e)}>
//                     <div className="sider-bar__logo">
//                         {collapsed === false ? (
//                             <div className="logo-full" />
//                         ) : (
//                             <div className="logo-collapsed" />
//                         )}
//                     </div>
//                 </Link>
//                 <Menu
//                     defaultSelectedKeys={[defaultSelectedKey]}
//                     defaultOpenKeys={['sub1']}
//                     inlineCollapsed={collapsed}
//                     className="sider-bar__menu"
//                     onSelect={(e) => handleSelectItem(e)}
//                 >
//                     {user.role === roles.PARKING_USER
//                         ? // ------------------- PARKING USER -----------------------
//                           parkingUserMenu
//                         : user.role === roles.PARKING_LOT_USER
//                         ? //------------------PARKING-LOT USER---------------------
//                           parkingLotUserMenu
//                         : //------------------------ADMIN--------------------------
//                           adminMenu}
//                     <div className="scoll-menu">
//                         <Button
//                             className="scoll-menu-button"
//                             onClick={toggleCollapsed}
//                         >
//                             {collapsed ? <RightOutlined /> : <LeftOutlined />}
//                         </Button>
//                     </div>
//                 </Menu>
//             </Sider>
//         </Layout>
    )
}

export default RenderMenu

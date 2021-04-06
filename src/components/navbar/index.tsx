import React, { useRef } from 'react'
import './css/index.css'
import { Menu, Dropdown } from 'antd'
import { BellOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = (props: any) => {
    const imgDom = useRef<any>()

    const translateMenu = (
        <Menu style={{ width: 160 }}>
            <Menu.Item><span role="img" aria-label="English">🇨🇳</span> English</Menu.Item>
            <Menu.Item><span role="img" aria-label="Bahasa Indonesia">🇮🇩</span> Bahasa Indonesia</Menu.Item>
            <Menu.Item><span role="img" aria-label="日本語">🇯🇵</span> 日本語</Menu.Item>
            <Menu.Item><span role="img" aria-label="Português">🇧🇷</span> Português</Menu.Item>
            <Menu.Item style={{ background: '#e6f7ff', color: '#1890ff' }}><span role="img" aria-label="简体中文">🇨🇳</span> 简体中文</Menu.Item>
            <Menu.Item><span role="img" aria-label="繁体中文">🇭🇰</span> 繁体中文</Menu.Item>
        </Menu>
    )

    const personageMenu = (
        <Menu style={{ width: 160 }}>
            <Menu.Item><UserOutlined /><span>个人中心</span></Menu.Item>
            <Menu.Item><SettingOutlined /><span>个人设置</span></Menu.Item>
            <p className="divider"></p>
            <Menu.Item onClick={() => {
                props.history.push('/login')
            }}><LogoutOutlined /><span>退出登录</span></Menu.Item>
        </Menu>
    )

    return (
        <header className="navbar">
            <span></span>
            <div>
                <p className="navbar-action2"><SearchOutlined /></p>
                <p className="navbar-action"><QuestionCircleOutlined /></p>
                <p className="navbar-action"><BellOutlined /></p>
                <Dropdown overlay={ personageMenu }>
                    <p className="navbar-action">
                        <img onError={() => {
                            imgDom.current.src = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                        }} ref={imgDom} src="/images/微信图片_20210208152830.png" alt=""/>
                        <span>Serati Ma</span>
                    </p>
                </Dropdown>
                <Dropdown overlay={ translateMenu }>
                    <p className="navbar-action"><i className="iconfont icon-translate"></i></p>
                </Dropdown>
                
            </div>
        </header>
    )
}

export default Navbar

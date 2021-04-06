import { useState } from 'react'
import { Menu } from 'antd';
import { MailOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './css/index.scss'
import Navbar from '../../components/navbar/index'
import Views from './view'

const { SubMenu } = Menu;

const Home = (props: any): any => {
    const [state, setState] = useState<any>({
        leftShow: false,
        redirect: false
    });

    const leftClick = (e: any): void => {
        props.history.push(e.key)
    }

    //切换左侧样式
    const switchLeft = (): void => {
        state.leftShow = !state.leftShow
        setState({...state})
    }

    return (
        <div className="home">
            <div className="home-left" style={{ width: state.leftShow ? '48px' : '208px' }}>
                { 
                    !state.leftShow ? <div className="home-logo">
                        <img src={ '/images/logo.svg' } style={{ width: 26 }} alt=""/>
                        <h1>Chat Management</h1>
                    </div> : null 
                }
                <div className="home-menu">
                    <Menu
                        onClick={ leftClick }
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['/home/register']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        inlineCollapsed={state.leftShow}
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="用户管理">
                            <Menu.Item key="/home/register">注册用户</Menu.Item>
                            <Menu.Item key="/home/loginUser">登录用户</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <p onClick={() => switchLeft()} className="fold-outlined"><MenuFoldOutlined /></p>
            </div>
            <div className="home-right" style={{ width: state.leftShow ? 'calc(100% - 44px)' : 'calc(100% - 208px)' }}>
                <Navbar history={ props.history }></Navbar>
                <div className="home-content">
                    <Views history={ props.history }></Views>
                </div>
            </div>
        </div>
    )
}

export default Home

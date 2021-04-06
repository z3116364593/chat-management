import React, { useState } from 'react'
import { Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined, CopyrightOutlined } from '@ant-design/icons';
import './index.scss'

const Login = (props: any) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });
    const [automatic, setAutomatic] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const onLogin = async (): Promise<any> => {
        setLoading(true)
        setTimeout(() => {
            if(state.username === '1621121231' && state.password === 'zxcltno1.') {
                message.success('登录成功！')
                props.history.push('/home/register')
            } else {
                message.error('账号或密码不正确')
            }
            setLoading(false)
        }, 600)
    }

    return (
        <div className="login">
            <div className="login-title">
                <div>
                    <img src={ '/images/logo.svg' } alt=""/>
                    <span>Chat Management</span>
                </div>
            </div>
            <p className="login-describe">Chat Management 是用于管理chat的工具</p>
            <div className="login-content">
                <Input onChange={(e: any) => {
                    state.username = e.target.value
                    setState({ ...state })
                }} value={ state.username } size="large" placeholder="用户名" prefix={<UserOutlined style={{ color: '#1890ff' }} />} />
                <Input.Password onPressEnter={() => onLogin()} onChange={(e: any) => {
                    state.password = e.target.value
                    setState({ ...state })
                }} value={ state.password } size="large" placeholder="密码" style={{ marginTop: 24 }} prefix={<LockOutlined style={{ color: '#1890ff' }} />} />
                <div>
                    <Checkbox onChange={(e: any) => setAutomatic(e.target.checked)} checked={ automatic }>自动登录</Checkbox>
                    <Button type="link" style={{ paddingRight: 0 }}>忘记密码 ?</Button>
                </div>
                <Button onClick={() => onLogin()} type="primary" loading={ loading } size="large" style={{ width: '100%' }}>登 录</Button>
            </div>
            <p className="coyperight">Copyright <CopyrightOutlined /> 2021 皇家科技有限公司技术部出品</p>
        </div>
    )
}

export default Login

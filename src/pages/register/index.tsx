import React, { useRef } from 'react'
import { Breadcrumb, Button, Popconfirm } from 'antd';
import TableArea from '../../components/table/index'
import { requestDelList } from '../../api/register'

const Register = (): any => {
    const columns = [
        {
            title: '头像',
            key: 'headPortrait',
            render: (text: any) => (
                <img src={'/images/' + text.headPortrait} style={{ width: 40, height: 40 }} alt=""/>
            )
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: '操作',
            key: 'action',
            width: 70,
            render: (text: any) => (
                <Popconfirm
                    title="删除后无法撤回，确定要删除吗？"
                    onConfirm={async () => {
                        table.current.state.loading = true
                        table.current.setState({...table.current.state})
                        await requestDelList({ id: text._id })
                        table.current.getList()
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="link" style={{ paddingLeft: 0 }}>删除</Button>
                </Popconfirm>
            )
        },
    ]
    const table = useRef<any>()

    return (
        <div>
            <div className="crumbs">
                <Breadcrumb>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>注册用户</Breadcrumb.Item>
                </Breadcrumb>
                <span className="ant-page-header-heading-title" style={{ marginTop: 8, display: 'inline-block' }}>注册用户</span>
            </div>
            <div className="content">
                <TableArea ref={table} listUrl="/user/userList" columns={columns}></TableArea>
            </div>
        </div>
    )
}

export default Register

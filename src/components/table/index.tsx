import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { ReloadOutlined, ColumnHeightOutlined, SettingOutlined, MoreOutlined } from '@ant-design/icons';
import { Table, Button, Tooltip, Menu, Dropdown, Checkbox } from 'antd';
import './css/index.css'
import { requestList } from '../../api/list'

interface StateTypes {
    densityList: Array<{ name: string; size: string; active: boolean; }>,
    densityAction: string | any,
    columns: Array<any>,
    columnsRender: Array<any>,
    indeterminate: boolean,
    checkAll: boolean,
    dataSource: Array<any>,
    loading: boolean
}

const TableArea = forwardRef((props: any, ref: any): any => {
    const [state, setState] = useState<StateTypes>({
        densityList: [
            {
                name: '默认',
                size: 'default',
                active: false
            },
            {
                name: '中等',
                size: 'middle',
                active: true
            },
            {
                name: '紧凑',
                size: 'small',
                active: false
            },
        ],
        densityAction: 'middle',
        columns: [],
        columnsRender: [],
        indeterminate: false,
        checkAll: true,
        dataSource: [],
        loading: false
    });
    const page = useRef<any>({page: 1, size: 10, total: 0})

    const densityMenu = (
        <Menu style={{ width: 80 }}>
            {
                state.densityList.map((item: any, index: number) => (
                    <Menu.Item onClick={() => {
                        state.densityList.forEach((v: any) => v.active = false)
                        item.active = true
                        state.densityAction = item.size
                        setState({...state})
                    }} className={item.active ? 'menu-select' : ''} key={index}>{ item.name }</Menu.Item>
                ))
            }
        </Menu>
    )

    const columnMenu = (
        <Menu style={{minWidth: 150}}>
            <div className="all-menu">
                <Checkbox onChange={(e) => {
                    state.indeterminate = false
                    state.checkAll = e.target.checked
                    state.columns.forEach((item: any) => {
                        item.checked = e.target.checked
                    })
                    setState({...state})
                    setColumns()
                }} indeterminate={state.indeterminate} checked={state.checkAll}>列展示</Checkbox>
                <p onClick={() => {
                    state.columns.forEach((item: any) => item.checked = true)
                    setColumns()
                }} className="btn-blue">重置</p>
            </div>
            <Menu.Divider />
            {
                state.columns.map((item: any, index: number ) => (
                    <div className="setting" key={index}>
                        <p style={{ cursor: 'move', margin: 0, display: 'inline-block' }}>
                            <MoreOutlined />
                            <MoreOutlined className="more" />
                        </p>
                        <Checkbox onChange={(e) => {
                            item.checked = e.target.checked
                            let len: number = state.columns.filter((item: any) => item.checked).length
                            if(len !== 0 && len !== state.columns.length) {
                                state.indeterminate = true
                            } else {
                                state.indeterminate = false
                            }
                            state.checkAll = state.columns.every((item: any) => item.checked)
                            setState({...state})
                            setColumns()
                        }} checked={item.checked}>{ item.title }</Checkbox>
                    </div>
                ))
            }
        </Menu>
    )

    // 暴露给父组件的 参数 && 方法
    useImperativeHandle(ref, ()=>({
        state,
        setState,
        getList,
        page
    }))

    useEffect(() => {
        getList()
        let arr: any[] = props.columns
        arr.forEach((item: any) => {
            item.checked = true
        })
        state.columns = arr
        state.columnsRender = arr
        setState({...state})
    }, [])

    //设置列
    const setColumns = (): void => {
        let arr: any[] = state.columns.filter((item: any) => item.checked)
        state.columnsRender = arr
        setState({...state})
    }

    //获取列表
    const getList = async (): Promise<any> => {
        state.loading = true
        setState({...state})
        let params: any = {
            page: page.current.page,
            size: page.current.size
        }
        let response: any = await requestList(props.listUrl, params)
        page.current.total = response.data.total
        state.dataSource = response.data.list
        state.loading = false
        setState({...state})
    }

    return(
        <div className="table-area">
            <div className="table-action">
                <span></span>
                <div>
                    <Button type="primary" style={{ marginRight: 20, fontSize: '14px!important' }}>新增</Button>
                    <Tooltip title="刷新"><ReloadOutlined onClick={() => {
                        getList()
                    }} className="table-icon" /></Tooltip>
                    <Dropdown overlay={densityMenu} trigger={['click']}>
                        <Tooltip title="密度"><ColumnHeightOutlined className="table-icon" /></Tooltip>
                    </Dropdown>
                    <Dropdown overlay={columnMenu} trigger={['click']}>
                        <Tooltip title="列设置"><SettingOutlined className="table-icon" /></Tooltip>
                    </Dropdown>
                </div>
            </div>
            <Table pagination={{
                current: page.current.page,
                pageSize: page.current.size,
                total: page.current.total,
                onChange: (current: any, pageSize: any) => {
                    page.current.page = current
                    page.current.size = pageSize
                    getList()
                },
                onShowSizeChange: (current: any, size: any) => {
                    page.current.page = current
                    page.current.size = size
                    getList()
                }
            }} loading={state.loading} dataSource={state.dataSource} columns={state.columnsRender} size={state.densityAction} />
        </div>
    )
})

export default TableArea

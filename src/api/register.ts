import request from './request'

export const requestDelList = (params: any) => {
    return request('post', '/user/delUser', params)
}

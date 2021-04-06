import request from './request'

export const requestList = (url: string, params: any) => {
    return request('get', url, params)
}

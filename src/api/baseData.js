import request from '@/utils/request'

//获取指定分类信息
export function getCodeItem(key) {
    return request({
        url: '/member/getCodeItem/' + key,
        method: 'get',
    })
}

//获取指定分列表信息
export function getCodeItemList() {
    return request({
        url: '/member/getCodeItemList',
        method: 'get',
    })
}


export function getCodeItemListFor2() {
    return request({
        url: '/member/getCodeItemListFor2',
        method: 'get',
    })
}


export function updateOrAddCodeItem(data) {
    return request({
        url: '/member/updateOrAddCodeItem',
        method: 'post',
        data: data
    })
}


export function deleteCodeItem(data) {
    return request({
        url: '/member/deleteCodeItem',
        method: 'post',
        data: data
    })
}
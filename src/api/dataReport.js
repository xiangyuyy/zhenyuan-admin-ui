import request from '@/utils/request'

//获取头部信息
export function member(mId) {
    return request({
        url: '/dataReport/member/' + mId,
        method: 'get',
    })
}

export function getMemberRecordList(params) {
    return request({
        url: '/dataReport/getMemberRecordList',
        method: 'get',
        params: params
    })
}


// 部门申报变更记录查询列表
export function getShopMemberRecordList(data) {
    return request({
        url: '/dataReport/getShopMemberRecordList',
        method: 'post',
        data: data
    })
}
// 实际高于编制
export function getgybzMemberList(data) {
    return request({
        url: '/dataReport/getgybzMemberList',
        method: 'post',
        data: data
    })
}

// 实际虚挂人员
export function getsjxgMemberList(data) {
    return request({
        url: '/dataReport/getsjxgMemberList',
        method: 'post',
        data: data
    })
}
// 本店虚挂人员
export function getbdxgMemberList(data) {
    return request({
        url: '/dataReport/getbdxgMemberList',
        method: 'post',
        data: data
    })
}

// 实际与编制相同人员
export function getbzxtMemberList(data) {
    return request({
        url: '/dataReport/getbzxtMemberList',
        method: 'post',
        data: data
    })
}

// 导出实际高于
export function exportgybzMemberList(data) {
    return request({
        url: '/dataReport/exportgybzMemberList',
        method: 'post',
        responseType: 'blob',
        data: data
    })
}

// 导出实际虚挂人员
export function exportsjxgMemberList(data) {
    return request({
        url: '/dataReport/exportsjxgMemberList',
        method: 'post',
        responseType: 'blob',
        data: data
    })
}

// 导出本店虚挂人员
export function exportbdxgMemberList(data) {
    return request({
        url: '/dataReport/exportbdxgMemberList',
        method: 'post',
        responseType: 'blob',
        data: data
    })
}

// 导出编制相同人员
export function exportbzxtMemberList(data) {
    return request({
        url: '/dataReport/exportbzxtMemberList',
        method: 'post',
        responseType: 'blob',
        data: data
    })
}

// 导出部门申报变更记录查询列表
export function exportShopMemberRecordList(params) {
    return request({
        url: '/dataReport/exportShopMemberRecordList',
        method: 'get',
        params: params,
        responseType: 'blob',
    })
}

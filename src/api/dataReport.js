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
export function getShopMemberRecordList(params) {
    return request({
        url: '/dataReport/getShopMemberRecordList',
        method: 'get',
        params: params
    })
}
// 实际高于编制
export function getgybzMemberList(params) {
    return request({
        url: '/dataReport/getgybzMemberList',
        method: 'get',
        params: params
    })
}

// 实际虚挂人员
export function getsjxgMemberList(params) {
    return request({
        url: '/dataReport/getsjxgMemberList',
        method: 'get',
        params: params
    })
}
// 本店虚挂人员
export function getbdxgMemberList(params) {
    return request({
        url: '/dataReport/getbdxgMemberList',
        method: 'get',
        params: params
    })
}

// 实际与编制相同人员
export function getbzxtMemberList(params) {
    return request({
        url: '/dataReport/getbzxtMemberList',
        method: 'get',
        params: params
    })
}

// 导出实际高于
export function exportgybzMemberList(sId) {
    return request({
        url: '/dataReport/exportgybzMemberList?shopId=' + sId,
        method: 'get',
        responseType: 'blob'
    })
}

// 导出实际虚挂人员
export function exportsjxgMemberList(sId) {
    return request({
        url: '/dataReport/exportsjxgMemberList?shopId=' + sId,
        method: 'get',
        responseType: 'blob'
    })
}

// 导出本店虚挂人员
export function exportbdxgMemberList(sId) {
    return request({
        url: '/dataReport/exportbdxgMemberList?shopId=' + sId,
        method: 'get',
        responseType: 'blob',
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
// 导出编制相同人员
export function exportbzxtMemberList(sId) {
    return request({
        url: '/dataReport/exportbzxtMemberList?shopId=' + sId,
        method: 'get',
        responseType: 'blob'
    })
}
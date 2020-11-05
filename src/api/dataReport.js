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
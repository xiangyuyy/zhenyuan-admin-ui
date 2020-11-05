import request from '@/utils/request'
// 岗位
export function getDrugPosition() {
    return request({
        url: '/member/getDrugPosition',
        method: 'get'
    })
}
// 上报职称
export function getDrugTitleSelect() {
    return request({
        url: '/member/getDrugTitleSelect',
        method: 'get'
    })
}
//编制职称 
export function getDrugOrgSelect() {
    return request({
        url: '/member/getDrugOrgSelect',
        method: 'get'
    })
}
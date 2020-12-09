import request from '@/utils/request'

//获取单号
export function getReportId() {
    return request({
        url: '/drugReport/getReportId',
        method: 'get',
    })
}
//根据shopId获取药监数据
export function getShopDrugCount(id) {
    return request({
        url: '/drugReport/getShopDrugCount/' + id,
        method: 'get',
    })
}
//获取药监数据
export function getDrugCount(data) {
    return request({
        url: '/drugReport/getDrugCount',
        method: 'post',
        data: data
    })
}

//确定药监数据
export function sureDrugCount(data) {
    return request({
        url: '/drugReport/sureDrugCount',
        method: 'post',
        data: data
    })
}
//药监人员新增列表
export function getMemberList(params) {
    return request({
        url: '/drugReport/getMemberList',
        method: 'get',
        params: params
    })
}
//添加人员
export function addPersonal(data) {
    return request({
        url: '/drugReport/add',
        method: 'post',
        data: data
    })
}
//药监申报录入表  控制台明细子页面
export function getDrugReportMemberList(params) {
    return request({
        url: '/drugReport/getDrugReportMemberList',
        method: 'get',
        params: params
    })
}
//控制台明细子页面头部信息
export function getDrugReport(reportId) {
    return request({
        url: '/drugReport/getDrugReport/' + reportId,
        method: 'get',
    })
}

//门店变更录入表
export function getDrugChangeReportMemberList(params) {
    return request({
        url: '/drugReport/getDrugChangeReportMemberList',
        method: 'get',
        params: params
    })
}
//获取修改人员信息
export function member(id) {
    return request({
        url: '/member/member/' + id,
        method: 'get',
    })
}
//获取变更指定人员信息
export function getMemberRecord(rowId) {
    return request({
        url: '/drugReport/getMemberRecord/' + rowId,
        method: 'get',
    })
}
//修改变更指定人员信息
export function updateMemberRecord(data) {
    return request({
        url: '/drugReport/updateMemberRecord',
        method: 'post',
        data: data
    })
}

//删除
export function deleteDrugReportMember(id) {
    return request({
        url: '/drugReport/deleteDrugReportMember/' + id,
        method: 'post'
    })
}

//审核
export function passDrugReport(reportId) {
    return request({
        url: '/drugReport/passDrugReport/' + reportId,
        method: 'post'
    })
}

//审核按钮权限
export function isCanSH() {
    return request({
        url: '/drugReport/isCanSH',
        method: 'get',
    })
}

//确定保存不导出
export function sureDrugReport(data) {
    return request({
        url: '/drugReport/sureDrugReport',
        method: 'post',
        data: data
    })
}

//清空
export function deleteAllDrugReportMember(reportId) {
    return request({
        url: '/drugReport/deleteAllDrugReportMember/' + reportId,
        method: 'post'
    })
}

//获取控制台列表
export function getDrugReportList(data) {
    return request({
        url: '/drugReport/getDrugReportList',
        method: 'post',
        data
    })
}

//获取学历
export function getAllEducation() {
    return request({
        url: '/member/getAllEducation',
        method: 'get'
    })
}

export function choseShopAddDrugReportMember(sId, rId) {
    return request({
        url: 'drugReport/choseShopAddDrugReportMember/?shopId=' + sId + '&reportId=' + rId,
        method: 'get'
    })
}

//获取操作员
export function getAllOperator() {
    return request({
        url: '/drugReport/getAllOperator',
        method: 'get'
    })
}

export function getShopDrugChangeReportMemberList(params) {
    return request({
        url: '/drugReport/getShopDrugChangeReportMemberList',
        method: 'get',
        params: params
    })
}


export function getChangeReportId(sId) {
    return request({
        url: '/drugReport/getChangeReportId/?shopId=' + sId,
        method: 'get',
    })
}

export function addReportChangeMember(data) {
    return request({
        url: '/drugReport/addReportChangeMember',
        method: 'post',
        data: data
    })
}




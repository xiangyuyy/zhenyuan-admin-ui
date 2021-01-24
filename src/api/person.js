import request from '@/utils/request'
//获取人员列表
export function getMemberList(data) {
    return request({
        url: '/member/getMemberList',
        method: 'post',
        data: data
    })
}
//添加/修改信息
export function update(data) {
    return request({
        url: '/member/update',
        method: 'post',
        data: data
    })
}
//获取门店
export function getShopSelect() {
    return request({
        url: '/member/getShopSelect',
        method: 'get',
    })
}
export function getAllDepartmentShop() {
    return request({
        url: '/member/getAllDepartmentShop',
        method: 'get',
    })
}

export function filterTree(tree) {
    if (tree.children) {
        if (tree.children.length) {
            let children = [];
            tree.children.forEach(item => {
                children.push(filterTree(item))
            });
            tree.children = children;
            return tree;

        } else {
            let keys = Object.keys(tree);
            let obj = {};
            keys.forEach(item => {
                if (item !== 'children') {
                    obj[item] = tree[item]
                }
            });
            return obj;
        }
    } else {
        return tree;
    }
}
//获取职称
export function getAllTitle() {
    return request({
        url: '/member/getAllTitle',
        method: 'get',
    })
}

//获取专业
export function getMajorSelect() {
    return request({
        url: '/member/getMajorSelect',
        method: 'get',
    })
}

// 药监专业
export function getMemberMajor(id) {
    return request({
        url: '/member/getMemberMajor/' + id,
        method: 'get',
    })
}

// 药监学历
export function getMemberEducation(id) {
    return request({
        url: '/member/getMemberEducation/' + id,
        method: 'get'
    })
}

// 变更原因
export function getAllDrugChangeReason() {
    return request({
        url: '/member/getAllDrugChangeReason',
        method: 'get'
    })
}
// 人员类别
export function getPeopleKindSelect() {
    return request({
        url: '/member/getPeopleKindSelect',
        method: 'get'
    })
}

//职务或岗位
export function getDrugPosition() {
    return request({
        url: '/member/getDrugPosition',
        method: 'get',
    })
}

//人员详细信息
export function getMemberInfor(mId) {
    return request({
        url: '/member/getMemberInfor/' + mId,
        method: 'get',
    })
}


//组织机构
export function getAllDepartment() {
    return request({
        url: '/member/getAllDepartment',
        method: 'get',
    })
}


export function getDrugCountList(params) {
    return request({
        url: '/drugReport/getDrugCountList',
        method: 'get',
        params: params
    })
}
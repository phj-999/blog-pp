import request from "../utils/request";

export function getcategories() {
    return request({
        url:'/categories'
    })
}

// 保存草稿或者提交
export function save(data) {
    return request({
        url:'/news',
        method:'post',
        data 
    })
}
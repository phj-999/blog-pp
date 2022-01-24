import request from "../utils/request";

export function getcategories() {
    return request({
        url:'/categories'
    })
}
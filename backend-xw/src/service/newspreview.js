/** 草稿箱详情 */

import request from "../utils/request";

/** 草稿箱详情数据请求 */
export function getnewspreview(id) {
    return request({
        url:`/news/${id}?_expand=category&_expand=role`,
        method:"get"
    })
}
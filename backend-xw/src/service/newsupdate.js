/** 草稿箱详情 */

import request from "../utils/request";

/** 草稿箱详情数据请求 */
export function patchnews(id,params) {
    return request({
        url:`/news/${id}`,
        method:"patch",
        params
    })
}
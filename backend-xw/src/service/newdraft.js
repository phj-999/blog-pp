/**草稿箱数据 */
import request from "../utils/request";

/**获取个人草稿箱数据 */
export function getdraftdate(name) {
  return request({
    url: `/news?author=${name}&auditState=0&_expand=category`,
    method: "get",
  });
}

/**删除个人草稿箱数据 */
export function deletedraftdate(item) {
  return request({
    url: `/news/${item.id}`,
    method: "delete",
  });
}
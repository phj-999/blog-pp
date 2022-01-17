import request from '@/utils/request'

/**
 * 获取统计面板数据
 *
 * @returns {Promise<any>}
 */
export function fetchDashboard() {
  return request('/admin/index')
}

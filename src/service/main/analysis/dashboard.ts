import hyRequest from '../../index'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count', //商品数量
  categoryGoodsSale = '/goods/category/sale', //不同城市销量
  categoryGoodsFavor = '/goods/category/favor', // 分类商品数量
  addressGoodsSale = '/goods/category/sale' // 分类商品销量
}

export function getCategoryGoodsCount() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return hyRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}

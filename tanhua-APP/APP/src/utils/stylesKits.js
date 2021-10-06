//设计稿宽度(已知) : 元素宽度(已知) = 手机屏幕(已知) : 手机中的元素宽度（未知）
import { Dimensions } from 'react-native'
/**
 * 屏幕宽度
 */
export const screenWidth = Dimensions.get('window').width
/**
 * 屏幕高度
 */
export const screenHeight = Dimensions.get('window').height
/**
 * 将px转为dp
 * @param {Number} elePx 元素的宽度或者高度  单位px
 */
export const pxToDp = (elePx) => screenWidth*elePx/375
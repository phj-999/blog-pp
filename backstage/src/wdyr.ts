/**
 *库 why-did-you-render
 * 有页面按无限渲染  检查
*/
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,//是否跟踪所有的函数组件  
  });
}
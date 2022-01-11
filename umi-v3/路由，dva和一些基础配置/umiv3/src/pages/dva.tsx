//1 uidz组件
//创建model
//ui组件和model链接

import React from 'react';
import { connect } from 'dva';

const dva = (props) => {
  const {dispatch} = props;
  const getDavData = () => {
    dispatch({
      type: 'tags/fetchTags', //命名空间/effect中定义的方法名
      payload:null
    })
  }
  const list = props.tags.tagsList.list || [];
  return (
    <div>
      <header> dav的使用</header>
      <button onClick={getDavData}>触发dva 获取数据 </button>
    </div>
  );
};

export default connect(({dvatest})=>({dvatest})) (dva); 
//第二个dvatest是自定义返回的 connect(({dvatest})=>({dvatest})) (dva);   写了之后从该dva页面的props里才可以解构出来

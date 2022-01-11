import React from 'react';
import { Link, NavLink } from 'umi';
import './index.less';

const Index = (props: any) => {
  return (
    <div>
      <h2>Header</h2>
      {/*<Link to="/user/one">用户1</Link>*/}
      {/*<Link to="/user/two">用户2</Link>*/}
      <hr />
      <NavLink to="/user/one">用户1</NavLink>
      <NavLink to="/user/two">用户2</NavLink>
      {props.children}
      <footer>Footer</footer>
    </div>
  );
};
export default Index;

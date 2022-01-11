import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Empty from "../src/View/Empty";
import Login from "./View/Login";
import Home from "./View/Home";

import {AuthLogin} from './common/Auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Redirect to="/home" />;
          }}
        />

        <Route
          path="/home"
          render={(props) => {
           if (!AuthLogin()) {
             //已经录 跳转之前页面 未登录跳转登陆页面
             return <Redirect to={`/login?preurl=${props.match.path}`}/>
           }
           
            return( <Home {...props} />);
          }}
        />

        <Route path="/login" component={Login} />

        <Route component={Empty}></Route>

      </Switch>
    </Router>
  );
}

export default App;

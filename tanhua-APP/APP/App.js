import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'mobx-react';

import Nav from './src/routers/nav';
import Geo from '@/utils/Geo';
import RootStore from './src/mobx';
import JMessage from '@/utils/JMessage'

class App extends Component {
  state = {
    isInitGeo: false,
  };
  async componentDidMount() {
    await Geo.initGeo();
    JMessage.init() //极光初始化
    this.setState({isInitGeo: true});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider RootStore={RootStore}>
          {this.state.isInitGeo ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
}

export default App;

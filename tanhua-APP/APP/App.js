import React, { Component } from 'react'
import {View, Text} from 'react-native'
import Nav  from "./src/nav";

import Geo from '@/utils/Geo'

class App extends Component {
  async componentDidMount(){
     const res = await Geo.getCityByLocation()
  }
  render(){
    return (
      <View style={{flex:1}}>
        <Nav>  
        
        </Nav>

       </View> 
    )
  }
}

export default App
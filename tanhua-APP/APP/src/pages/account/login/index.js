import React, {Component} from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

import {pxToDp} from '../../../utils/stylesKits';
import validator from '../../../utils/validator';
import request from "../../../utils/request";
import { ACCOUNT_LOGIN } from "../../../utils/pathMap";

export default class index extends Component {
   
  state = {
    phoneNumber: '999999999',
    //手机号码是否合法
    phoneValid: true,
  };
  //登录框事件
  phoneNumberChangeText = phoneNumber => {
    this.setState({phoneNumber});
  };
  //手机号码点击完成触发
  phoneNumberSubmitEditing = async() =>{
    /**
     *正则校验手机号码 --》
     手机号发送后台对应接口，获取验证码(异步请求时候，自动显示等待框 请求回来 等待框自动隐藏 要用到axios的拦截器)--》
     切换登陆页面为填写验证码页面
     *
     */
    const {phoneNumber} = this.state;
    const phoneValid = validator.validatePhone(phoneNumber);
    //未通过
    if (!phoneValid) {
      this.setState({phoneValid});
      return;
    }

     const res = await request.post(ACCOUNT_LOGIN,{phone:phoneNumber})

  };
  render() {
    const {phoneNumber} = this.state;
    return (
      <View>
        {/*状态栏 */}
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
        {/*背景图片*/}
        <Image
          style={{width: '100%', height: pxToDp(240)}}
          source={require('../../../assets/res/profileBackground.jpg')}
        />

        {/*登录功能*/}
        <View style={{padding: pxToDp(20)}}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(25),
                  color: '#888',
                  fontWeight: 'bold',
                }}>
                手机号登陆注册
              </Text>
            </View>
            {/*输入框*/}
            <View style={{padding: pxToDp(30)}}>
              <Input
                placeholder="请输入手机号"
                maxLength={11}
                keyboardType="phone-pad"
                value={phoneNumber}
                inputStyle={{color: '#ccc'}}
                leftIcon={{
                  type: 'font-awesome',
                  name: 'phone',
                  color: '#ccc',
                  size: pxToDp(20),
                }}
                onChangeText={this.phoneNumberChangeText}
                errorMessage={phoneValid ? '' : '手机号码不正确'}
                onSubmitEditing={this.phoneNumberSubmitEditing}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

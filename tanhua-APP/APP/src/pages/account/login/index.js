import React, {Component} from 'react';
import {Text, View, Image, StatusBar, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import { inject,observer } from "mobx-react";

import {pxToDp} from '../../../utils/stylesKits';
import validator from '../../../utils/validator';
import request from "@/utils/request";
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE } from "../../../utils/pathMap";

import THButton from '../../../components/THButton/index'


@inject('RooStore')
@observer
class index extends Component {
   
  state = {
    phoneNumber: '999999999',
    //手机号码是否合法
    phoneValid: true,
    //是否显示登陆页面
    showLogin:true,
    //验证码输入框的值
    vcodeTxt: '',
    //倒计时按钮文本
    btnText:'重新获取',
   // 是否在倒计时中
   isCountDowning:false
  };
  //登录框事件
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({phoneNumber});
    console.log(phoneNumber);
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

      await request.post(ACCOUNT_LOGIN, { phone: phoneNumber }).then(res=>{
      
      if (res.data.code=='10000') {
       
     this.setState({showLogin:false})
     //开始定时器
     this.countDown()
    }
   }).then(error=>{if(error){console.error();}})
 
  };
//定时器
  countDown=()=>{
    
    if (this.state.isCountDowning) {
      return
    }
    this.setState({isCountDowning:true})

    let seconds =5
    this.setState({btnText:`重新获取(${seconds}s)`})
    let timeId = setInterval(() => {
      seconds--
      this.setState({btnText:`重新获取(${seconds}s)`})
      if (seconds===0) {
        clearInterval(timeId)
        this.setState({btnText:'重新获取',isCountDowning:false})
      }
    }, 1000);
   }
//验证码输入完成时间
onVcodeSubmitEditing=async()=>{
  /**校验验证码 新用户跳转完善页面 否则跳转交友首页 */
  const {vcodeTxt,phoneNumber} = this.state
 if (vcodeTxt.length !==6) {
  //弹出弹出框提示不在正确
  return
 }
 await request.post(ACCOUNT_VALIDATEVCODE,{
  phone:phoneNumber,
  vcode:vcodeTxt
}).then(res=>{
  const resuser = res.data
  console.log(resuser.data.id, resuser.data.isNew);
  if (resuser.code!='10000') {
    return
  }

//存储用户到mobx
this.props.RootStore.setUserInfo(phoneNumber,resuser.data.token,resuser.data.id)

  if (resuser.data.isNew) {
    //新用户
    console.log('新用户');
    this.props.navigation.navigate('UserInfo')
  }else{
    //老用户
    console.log('老用户');
  }
}).then(error=>console.error(error))


}

//渲染登陆页面
renderLogin=()=>{
  const {phoneNumber,phoneValid} = this.state;
  return(
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
                inputStyle={{color: '#333'}}
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
            {/*渐变按钮 */}
            
            
                      <View>
                        <THButton 
                        onPress={this.phoneNumberSubmitEditing} 
                       
                        style={{ width:'85%',height:pxToDp(40),alignSelf:'center',borderRadius:pxToDp(20) }}>获取验证码</THButton>
                      </View>
            
          </View>
)
}
//点击重新获取按钮
repGetVcode=()=>{
  this.countDown()
}
//渲染验证码页面
renderVcode=()=>{
  const CELL_COUNT = 6; //表示有6格子
  const {phoneNumber,vcodeTxt,btnText,isCountDowning} = this.state;
  return(
    <View>
      <View><Text style={{fontSize:pxToDp(25),color:'#888',fontWeight:'bold'}}>输入6位验证码</Text></View>
      <View style={{marginTop:pxToDp(15)}}><Text style={{color:'#888'}}>已发送至：+86 {phoneNumber}</Text></View>
      <View>   
      <CodeField
        onSubmitEditing={this.onVcodeSubmitEditing}
        value={vcodeTxt}
        onChangeText={this.onVcodeChangeText}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      /></View>
      <View style={{marginTop:pxToDp(15)}}><THButton disabled={isCountDowning} onPress={this.repGetVcode} style={{width:'85%',height:pxToDp(40),alignSelf:'center',borderRadius:pxToDp(20)}}><Text>{btnText}</Text></THButton></View>
    </View>
  )
}
//验证码输入框值改变事件
onVcodeChangeText = vcodeTxt => {
  this.setState({vcodeTxt});
};

  render() {
    const {phoneNumber,phoneValid,showLogin} = this.state;
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
          {showLogin?this.renderLogin():this.renderVcode()}
          
          
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color:'#7d53ea'
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});


export default index
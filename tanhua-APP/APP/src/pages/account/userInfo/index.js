/**
 * 个人信息页面
 */
import React, { Component } from 'react'
import { Text, StyleSheet, View , TouchableOpacity} from 'react-native'
import {Input} from 'react-native-elements'
import SvgUri from "react-native-svg-uri";
import DatePicker from 'react-native-datepicker'

import {male, female} from '@/assets/res/picture/svg/iconSvg'
import { pxToDp } from "@/utils/stylesKits";

 class Index extends Component {
   
       

        state={
        
            "nickname": "张三",
            "gender": "男",
            "birthday": undefined,
            "city": "广州市",
            "header": "/upload/13828459787.jpg",
            "lng": "",
            "lat": "",
            "address": ""
          
     
    }
    

 // 选择性别
     chooeseGender=(gender)=>{
         this.setState({gender})
     }

    render() {
        const {gender,nickname}=this.state
        const dateNow = new Date()
        
        const currentDate = `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`
        return (
            <View style={{bachground:"#fff",flex:1,padding:pxToDp(20)}}>

                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold',}}> 填写资料 </Text>
                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold',}}> 提升自我魅力 </Text>
       {/**性别*/}     
<View style={{marginTop:pxToDp(20)}}>
   <View style={{ justifyContent: "space-around", width: "60%", flexDirection: "row", alignSelf: "center"}}>
   
   <TouchableOpacity onPress={this.chooeseGender.bind(this, "男")}  style={{ backgroundColor: gender === "男" ? "red" : "#eee",width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>
   <SvgUri svgXmlData={male} width='34' height='34'></SvgUri>
   </TouchableOpacity>
   <TouchableOpacity onPress={this.chooeseGender.bind(this, "女")} style={{ backgroundColor: gender === "女" ? "red" : "#eee",width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>
   <SvgUri svgXmlData={female} width='34' height='34'></SvgUri>
   </TouchableOpacity>
   </View>
</View>
            
            {/**昵称 */}
            <View>
                <Input 
                value={nickname}
                placeholder='设置昵称'
                onChangeText={(nickname)=>{this.setState({nickname})}}
                />
            </View>
            
            {/** 日期start */}
            <View>
            <DatePicker
                androidMode='spinner'
                style={{width: '100%'}}
                date={this.state.birthday}
                mode="date"
                placeholder="出生日期"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate={currentDate}
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateIcon: {
                    display:'none'
                  },
                  dateInput: {
                    marginLeft: pxToDp(10),
                    borderWidth: 0,
                    borderBottomWidth: pxToDp(1.1),
                    alignItems: "flex-start",
                    paddingLeft: pxToDp(4)
                  },
                  placeholderText: {
                    fontSize: pxToDp(18),
                    color: "#afafaf"
                  }
           
        }}
        onDateChange={(birthday) => {this.setState({birthday})}}
      />
            </View>
            {/** 日期end */}
            
            
            
            
            
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default Index
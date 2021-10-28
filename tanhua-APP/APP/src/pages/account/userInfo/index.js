/**
 * 个人信息页面
 */
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Input} from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {inject, observer} from 'mobx-react';

import {male, female} from '@/assets/res/picture/svg/iconSvg';
import {pxToDp} from '@/utils/stylesKits';
import Geo from '@/utils/Geo';
import CityJson from '@/assets/city/citys.json';
import THButton from '@/components/THButton/index';
import {ACCOUNT_REGINFO, ACCOUNT_CHECKHEADIMAGE} from '@/utils/pathMap';
import request from '@/utils/request';
import JMessage from '@/utils/JMessage';

@inject('RooStore')
@observer
class Index extends Component {
  state = {
    nickname: '张三',
    gender: '男',
    birthday: undefined,
    city: '广东市',
    header: '/upload/13828459787.jpg',
    lng: '',
    lat: '',
    address: '',
  };

  // 选择性别
  chooeseGender = gender => {
    this.setState({gender});
    console.log(gender);
  };
  //选择城市
  showCityPicker = () => {
    Picker.init({
      //  pickerData 要显示哪些数据 全国城市数据?
      pickerData: CityJson,
      // 默认选择哪个数据
      // selectedValue: ["河北", "唐山"],
      selectedValue: ['北京', '北京'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择城市',
      onPickerConfirm: data => {
        // data =  [广东，广州，天河]
        this.setState({
          city: data[1],
        });
      },
    });
    Picker.show();
  };

  //设置图像
  chooeseHeadImg = async () => {
    /**校验信息--裁剪插件裁剪-上传后台  信息提交后台  成功--极光注册 登录  跳转页面*/
    const {nickname, birthday, city} = this.setState;
    if (!nickname || !birthday || !city) {
      //Toast.sad('昵称或者生日不合法',2000,'center')
    }
    //获取到选中的图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      console.log('path', image.path);
    });

    const res0 = this.uploadHeadImg(image);
    if (res0.code === '10000') {
      //success
      return;
    }

    //构造参数  完善信息
    let params = this.state;
    params.header = res0.data.headImgPath;
    const res1 = await request.privatePost(ACCOUNT_REGINFO, params);
    if (res1.code === '10000') {
      //完善信息失败
      return;
    }

    //注册极光
    const res2 = await this.jgBussiness(
      this.props.RootStore.userId,
      this.props.RootStore.mobile,
    );
    console.log(res2);
  //跳转
  

  };

  //执行图片上传
  uploadHeadImg = image => {
    //构造参数 发送后台 完成图片上传
    let formData = new FormData();
    formData.append('headPhoto', {
      uri: image.path, //adress
      type: image.mime, //type
      name: image.path.split('/').pop(), //name
    });
    //执行上传
    return await request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  //执行注册极光
  jgBussiness = async (username, password) => {
    return await JMessage.register(username, password);
  };

  async componentDidMount() {
    const res = await Geo.getCityByLocation();
    console.log(res);
    const address = res.regeocode.formatted_address;
    const city = res.regeocode.addressComponent.city.replace('市', '');
    const lng =
      res.regeocode.addressComponent.streetNumber.location.split(',')[0];
    const lat =
      res.regeocode.addressComponent.streetNumber.location.split(',')[1];
    this.setState({address, city, lng, lat});
  }

  render() {
    const {gender, nickname, city, birthday} = this.state;
    const dateNow = new Date();

    const currentDate = `${dateNow.getFullYear()}-${
      dateNow.getMonth() + 1
    }-${dateNow.getDate()}`;
    return (
      <View style={{bachground: '#fff', flex: 1, padding: pxToDp(20)}}>
        <Text style={{fontSize: pxToDp(20), color: '#666', fontWeight: 'bold'}}>
          {' '}
          填写资料{' '}
        </Text>
        <Text style={{fontSize: pxToDp(20), color: '#666', fontWeight: 'bold'}}>
          {' '}
          提升自我魅力{' '}
        </Text>
        {/**性别*/}
        <View style={{marginTop: pxToDp(20)}}>
          <View
            style={{
              justifyContent: 'space-around',
              width: '60%',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={this.chooeseGender.bind(this, '男')}
              style={{
                backgroundColor: gender === '男' ? 'red' : '#eee',
                width: pxToDp(60),
                height: pxToDp(60),
                borderRadius: pxToDp(30),
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgUri svgXmlData={male} width="34" height="34"></SvgUri>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.chooeseGender.bind(this, '女')}
              style={{
                backgroundColor: gender === '女' ? 'red' : '#eee',
                width: pxToDp(60),
                height: pxToDp(60),
                borderRadius: pxToDp(30),
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgUri svgXmlData={female} width="34" height="34"></SvgUri>
            </TouchableOpacity>
          </View>
        </View>

        {/**昵称 */}
        <View>
          <Input
            value={nickname}
            placeholder="设置昵称"
            onChangeText={nickname => {
              this.setState({nickname});
            }}
          />
        </View>

        {/** 日期start */}
        <View>
          <DatePicker
            androidMode="spinner"
            style={{width: '100%'}}
            date={birthday}
            mode="date"
            placeholder="出生日期"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate={currentDate}
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
              dateIcon: {
                display: 'none',
              },
              dateInput: {
                marginLeft: pxToDp(8),
                borderWidth: 0,
                borderBottomWidth: pxToDp(1.1),
                alignItems: 'flex-start',
                paddingLeft: pxToDp(4),
              },
              placeholderText: {
                fontSize: pxToDp(18),
                color: '#afafaf',
              },
            }}
            onDateChange={birthday => {
              this.setState({birthday});
            }}
          />
        </View>
        {/** 日期end */}

        {/**地址start */}
        <View style={{marginTop: pxToDp(20)}}>
          <TouchableOpacity onPress={this.showCityPicker}>
            <Input
              value={'当前定位:' + city}
              inputStyle={{color: '#666'}}
              disabled={true}
            />
          </TouchableOpacity>
        </View>
        {/**地址end */}

        {/* 选择头像 start */}
        <View style={{marginTop: pxToDp(20)}}>
          <THButton
            onPress={this.chooeseHeadImg}
            style={{
              height: pxToDp(40),
              borderRadius: pxToDp(20),
              alignSelf: 'center',
            }}>
            设置头像
          </THButton>
        </View>
        {/*  选择头像 end */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Index;

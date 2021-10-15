/**
 * 高德地图引入 
 * */
import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";
class Geo {
  async initGeo() {
      //若是安卓系统  请求权限
    if (Platform.OS == "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
        //android的为高德地图中申请的安卓端的key
      //ios: "",
      android: "6a4e8b05d9cf996d1aa0ccbb1f643e40"
    });
    return Promise.resolve();
  }
  //获取当前地理位置
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
        console.log('getCurrentPosition:',coords);
      }, reject);
    })
  }
  //利用拿到的地理位置返回值拿到经纬度，从接口里拿到信息
  async getCityByLocation() {
    await init({
        //android的为高德地图中申请的安卓端的key
      //ios: "",
      android: "6a4e8b05d9cf996d1aa0ccbb1f643e40"
    });
   // const { longitude, latitude } = await this.getCurrentPosition();
    const { longitude, latitude } = await this.getCurrentPosition();

    console.log('jingweidu', longitude,latitude);
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
        //参数key为高德地图中第一个应用webapi的key
      params: { location: `${longitude},${latitude}`, key: "ecef1d0a66e062fc915f08b7304774ad", }
    });
    return Promise.resolve(res.data);
  }
}


export default new Geo();
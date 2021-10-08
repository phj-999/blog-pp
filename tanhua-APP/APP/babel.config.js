module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  /**
   * 路径别名 
   * */
  'plugins':[
    ['module-resolver',{
      'root':['./src'],
      'alias':{
        '@/utils':'./src/utils',
        '@/assets':'./src/assets',
        '@/pages':'./src/pages',
        '@/components':'./src/components',
      }
    }],
    ["import", { libraryName: "@ant-design/react-native" }] //antd mobile-rn 按需加载
  ]
};

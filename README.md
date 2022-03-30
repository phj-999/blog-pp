```javascript
let BASE_URL = 'http://localhost:3000'

oneData: 'BASE_URL/api/echartsapi/onedata'
twoData: 'BASE_URL/api/echartsapi/twodata'
threeData: 'BASE_URL/api/echartsapi/threedata'
fourData: 'BASE_URL/api/echartsapi/fourdata'
mapData: 'BASE_URL/api/echartsapi/mapdata'
```

user 模块：
用户注册接口：'BASE_URL/api/user/register'
采用的加密逻辑
首先在客户端启动的时候，发送一个请求，获取公钥，存在浏览器本地 sessionStorage

然后发送数据的时候首先通过 HMACSHA256 对数据进行散列消息认证，得到一串不可逆的字符串，然后通过非对称加密的方式使用我们请求回来的公钥加密这个字符串。通过请求头发送给后台

后台

当用户请求公钥时，

接下来需要写一个中间件，判断哪些路由是不需要验证的，

比如获取公钥的接口就不需要验证，对不需要验证的接口直接放行
对需要验证的路由，我们拿到请求头信息，用公钥对应的私钥去解密，
就会获取到 HMACSHA256 认证后的字符串。接下来我们用 HMACSHA256 对明文参数进行相同的消息认证。对比解密出来的认证字符串和自己生成的认证字符串是否一致，一致的话证明数据没有被篡改，执行放行操作，否则返回对应的错误信息提示

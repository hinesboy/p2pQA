import Mock from 'mockjs'
console.log('>>>>load mockjs ')

Mock.setup({
  timeout: 300, // 设置延迟响应，模拟向后端请求数据
});

/*// 登陆接口
Mock.mock('/account/login', 'post', {
  "nickname":  "\"\\u6d4b\\u8bd5\\u7528\\u6237\"",
  "email": "test@gmail.com",
  "token": "993523684dbc1000b45bf06ed32b91d4656deabc"
});

// 注册接口
Mock.mock('/account/register', 'post', {
  "detail": "注册成功"
});*/


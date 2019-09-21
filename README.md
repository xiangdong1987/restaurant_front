# restraurant_front
## 前端总结
### 接口
* 所有的接口都是通过封装axios获取执行远端调用的 
* 接口目录在src/api下定义

### 路由
* 路由目录在src/route下,路由相当于菜单同时也做权限控制
* 路由可以封装到modules包中
* 路由决定使用什么view组件

### 页面
* 页面目录在src/views下,所有的页面都是可以当做组件使用
* 组件中也可以有组件,但是要想要数据来源是否互相影响

### 存储
* 有时候我们需要客户端自己做一些存储,比如用户token及一些系统配置
* 通过store目录中封装的vuex来实现客户端存储

## 配置服务端 
* 修改配置.env.环境变量中的VUE_APP_BASE_API

## 组件
* 所有组件都可以参考[https://element.eleme.cn/#/zh-CN/](https://element.eleme.cn/#/zh-CN/)

## 安装使用

```
//安装
npm instatll 
//开启测试环境
npm run dev 
//编译上环境
npm run build:prod

```

> 编译成功后可以将static 文件配置到自己的http 服务下即可

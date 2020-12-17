# kzama-mock
## 说明
一个用命令行解决接口Mock的工具，使用简单，支持XHR, Fetch。

## 安装
```
npm i kazma-mock -g
```
## Quick Start

### 第一步：
定位到项目目录

```
cd path/to/project
```

### 第二步：
初始化:

```
kmock init
```

> `init`  命令会在项目根目录下创建默认文件夹mock，通过`--dir`参数可指定目录名

### 第三步：
定位到mock目录

```
cd mock
```

运行mock服务

```
kmock start
```
> 默认监听3000端口，可通过`--port`配置端口，支持多项目同时mock
> 访问`localhost:3000/a` 成功返回数据
### 添加新的mock文件
```
kmock add
```
## Vue 项目使用
### 代理配置
代理配置可参照vue官网的配置教程 https://cli.vuejs.org/zh/config/#devserver

使用vue-cli 3.0初始化的项目,在根目录中加入vue.config.js
```
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    baseUrl: '/',
    devServer: {
        proxy: {
            '/mock': {
                target: 'http://localhost:3000', // api mock的地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/mock': ''
                }
            }
        }
    }
}
```
使用vue-cli 2.0初始化的项目,在config/index中加入proxyTable

```
    proxyTable: {
      '/mock': {
        target: 'http://localhost:3000', // api mock的地址 
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/sf': 'http://order.test.com/sf' 
        }
      }
    },
```
### 接口调用
```
    axios.get("/mock/a").then(res => {
      console.log(res);
    });
```
## 使用说明

| Params      | Value                 | Description                                                                                                                                                                                           |
| ----------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | /xx                   | 请求api, 支持正则的[匹配模式](https://expressjs.com/en/4x/api.html#path-examples)                                                                                                                     |
| method      | get/post/put/delete   | 请求方法                                                                                                                                                                                              |
| dataType    | jsonp                 | **可选** 当请求为jsonp时需配置该项，仅当result为JSON时生效，为function时要自己处理返回                                                                                                                |
| contentType | `multipart/form-data` | **可选** 当方法为`post`且请求类型为`multipart/form-data`时，需配置该参数                                                                                                                              |
| test        | http://test/api/1     | **可选** 将请求代理到测试地址，当配置product时，优先代理product                                                                                                                                       |
| product     | http://prod/api/1     | **可选** 将请求代理到正式地址                                                                                                                                                                         |
| result      | JSON/Function         | **JSON** 直接配置静态/动态数据，动态数据的配置可参考 [Mockjs](http://mockjs.com/examples.html)<br>**Function** 支持返回一个方法，你可以读取请求参数进行一些判断, 并返回自定义内容，支持Mock和文件读取 |


## 例子
### 1. 返回JSON格式数据

```javascript
/*
  返回简单的json数据，变量语法可参考 http://mockjs.com/examples.html
 */

module.exports = {
  url: '/a',
  method: 'get',
  result: {
    'status|1': ["no_login", "OK", "error", "not_registered", "account_reviewing"],
    'msg': '@csentence()',
    'data': {
      a: 2
    }
  }
}
```

### 2. 返回JSONP格式数据

```javascript
/*
  返回简单的json数据，变量语法可参考 http://mockjs.com/examples.html
 */

module.exports = {
  url: '/a',
  method: 'get',
  dataType: 'jsonp',
  result: {
    'status|1': ["no_login", "OK", "error", "not_registered", "account_reviewing"],
    'msg': '@csentence()',
    'data': {
      a: 2
    }
  }
}
```

### 2. 自定义函数
```javascript
/*
  用户可以自定义返回函数，采用express语法
  当请求方法为post且Content-Type为multipart/form-data，需设置contentType参数
 */

module.exports = {
  url: '/b',
  method: 'post',
  contentType: 'multipart/form-data',
  result: function (req, res) {
    // POST方法req.body获取请求信息
    if (req.body.name === 'admin' && req.body.password === 'admin') {
      res.send({"msg": "登录成功！","code": 0,"authorization":"fdjflsjflfds4f5df5s4f5d4f5s"});
    }else {
      res.send({"msg": "账号或者密码错误！", "code": 1});
    }
  }
}
```
### 3. 动态Mock和文件读取
```javascript
/*
  demo c: url 请求接口支持动态url参数，:id
  kazma-mock 提供了暴露Mock方法和require方法，当数据量大时，用户可以直接引入独立json文件, 或进行Mock操作
 */

module.exports = {
  url: '/c/:id',
  method: 'get',
  result: function (req, res) {
    const Mock = res.Mock
    const json = res.require('./c.json')
    // url 参数通过req.params获取，?xxx=xx参数通过req.query获取
    if (req.params.id === '1') {
      // res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
      res.send({"msg": "获取用户" + req.params.id + "信息成功"});
    } else { 
      res.send(Mock.mock(json));
    }
  }
}
```

## 项目快速配置
工具也可以只安装在项目中作为开发依赖，不用全局安装
```
npm i kazma-mock --save-dev
```
修改package.json中的scripts
```
"scripts": {
  "mock": "cd mock && kmock start",
}
```
运行时执行 `npm run mock`

### License
[MIT](http://opensource.org/licenses/MIT)
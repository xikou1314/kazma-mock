/*
  demo c: url 请求接口支持动态url参数，:id
  k-mock 提供了暴露Mock方法和require方法，当数据量大时，用户可以直接引入独立json文件, 或进行Mock操作
 */

const data = {
  "code": 0,
  "msg": "操作成功！",
  "total": 20,
  "data": {
    "id|+1": 1,
    "num": "RegExp_\\d{5,10}",
    "array|3": [
      "Mock.js"
    ],
    "object|2": {
      "310000": "上海市",
      "320000": "江苏省",
      "330000": "浙江省",
      "340000": "安徽省"
    },
    "cparagraph": "@cparagraph",
    "name": "leason",
    "items|1-5": [{
      "id|+1": 1,
      "type|1": [0, 1],
      "name": "RegExp_\\d{5,10}"
    }]
  }
};

module.exports = {
  url: '/c/:id',
  method: 'get',
  result: function (req, res) {
    const Mock = res.Mock
    // url 参数通过req.params获取，?xxx=xx参数通过req.query获取
    if (req.params.id === '1') {
      // res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
      res.send({
        "msg": "获取用户" + req.params.id + "信息成功"
      });
    } else {
      res.send(Mock.mock(data));
    }
  }
}
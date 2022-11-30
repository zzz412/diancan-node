import { Context, Next } from "koa"

// 返回结果中间件
export default () => {
  return async function (ctx: Context, next: Next) {
    // 响应对象格式:  {  code: 状态码,  msg: 提示信息, data: 数据信息  }
    // code状态码对照表
    // 200     成功
    // 301     未登录
    // 302     参数错误
    // 500     程序错误
    ctx.success = function(data = null, msg = '请求成功', code = 200) {
      ctx.body = { data, msg, code }
    }

    await next()
  }
}
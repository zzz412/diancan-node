import { Context, Next } from 'koa'
import ResultError from '../config/error'

// 全局异常中间件
export default () => {
  return async function (ctx: Context, next: Next) {
    try {
      // 向ctx对象添加错误方法 方便抛出自定义异常
      ctx.error = function(msg: string, code = 500) {
        throw new ResultError(msg, code)
      }
      await next()
    } catch (error) {
      // 后续中间件发生错误都会被catch捕获
      // 判断当前错误类型【是否为已知错误】
      if (error instanceof ResultError) {
        // 已知错误【自己抛出的】
        ctx.body = { msg: error.msg, code: error.code }
      } else if (error.errors) {
        // 参数校验错误
        ctx.body = { msg: error.errors[0].message, code: 302 }
      } else if (error.status === 401) {
        // Token认证错误
        ctx.body = { msg: 'token错误', code: 301 }
      } else {
        // 未知错误【程序抛出的】
        ctx.body = { msg: '程序错误了', code: 500 }
        ctx.status = 500
      }
    }
  }
}

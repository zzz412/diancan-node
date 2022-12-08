// 校验参数中间件
import { Context, Next } from "koa"
import Scheme, { Rules } from 'async-validator'
import { filterKeys } from "../utils"

export default (rules: Rules) => {
  return async function(ctx: Context, next: Next) {
    // 校验的核心:  规则【参数】、校验目标【请求参数】
    const validator = new Scheme(rules)
    // 根据不同的请求类型去校验不同的参数  { ...对象 } => 将数组转为对象
    const params = ctx.method === 'GET' ? { ...ctx.query } : ctx.request.body
    // 将参数对象添加到新属性中  label value
    ctx.data = filterKeys(params, Object.keys(rules))
    await validator.validate(params)
    // 校验成功
    await next()
  }
}
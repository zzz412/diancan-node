// * 商家验证接口模块
import Router from 'koa-router'
import flq from '../../SQLConnect'
import validator from '../../middleware/validator'
import { registerRules } from '../../rules/authRules'

const shop_user = flq.from('shop_user')

const router = new Router({ prefix: '/auth' })

// * 商家注册
router.post('/register', validator(registerRules) , async (ctx) => {
  // 1. 解析参数字段
  const { phone, password } = ctx.request.body
  // 2. 校验是否重复注册
  const data = await shop_user.where({ phone }).find()
  if (data.length) return ctx.error('用户已注册', 302)
  // 3. 添加商家信息  【商家id - 唯一标识】
  await shop_user.value({ phone, password, uid: Date.now() } ).add()
  ctx.success()
})

// * 商家登录
// 校验参数有效性 （起码不能为空）
// 校验用户名与密码 【是否存在、正确】
// 生成Token 响应结果 【后续介绍】 😢
router.post('/login',async (ctx) => {
  console.log('登录成功')
  ctx.success()
})

export default router.routes()
import Router from 'koa-router'
import errorCode from '../config/errorCode'

const router = new Router()

router.get('/', (ctx) => {
  if (ctx.query.a !== '1') {
    // 未登录
    return ctx.error('用户未登录', errorCode.NoLogin)
  }
  ctx.success()
})

router.post('/', (ctx) => {
  console.log('请求成功2')
  // @ts-ignore
  ctx.success({ a: 1, b: 2 }, '获取数据成功')
})

export default router
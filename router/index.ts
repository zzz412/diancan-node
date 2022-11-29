import Router from 'koa-router'

const router = new Router()

router.get('/', (ctx) => {
  console.log('请求成功')
  ctx.body = '你好'
})

router.post('/', (ctx) => {
  console.log('请求成功2')
  ctx.body = 'post你好'
})

export default router
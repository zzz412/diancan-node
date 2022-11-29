// 项目入口文件
import Koa from 'koa'
import KoaBody from 'koa-body'
import Cors from 'koa2-cors'
import router from './router'

// 实例化koa
const app = new Koa()

// 开启跨域
app.use(Cors())
// 解析post请求参数  json urlencoded
app.use(KoaBody())

// 开启路由并开放所有请求方法
app.use(router.routes()).use(router.allowedMethods())

// 启动服务器
app.listen(5001)
console.log('服务器启动成功')
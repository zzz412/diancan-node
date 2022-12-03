// 项目入口文件
import Koa from 'koa'
import KoaBody from 'koa-body'
import Cors from 'koa2-cors'
import JWT from 'koa-jwt'
import abnormal from './middleware/abnormal'
import result from './middleware/result'
import router from './router'
import './types'
import { secretKey } from './config'

// 实例化koa
const app = new Koa()

// 开启跨域
app.use(Cors())
// 解析post请求参数  json urlencoded
app.use(KoaBody())
// 开启全局异常捕获
app.use(abnormal())
// 统一返回格式
app.use(result())

// 开启JWT认证拦截  TOKEN   /admin/auth
app.use(JWT({ secret: secretKey }).unless({ path: /\/admin\/auth/ }))

// 开启路由并开放所有请求方法
app.use(router.routes()).use(router.allowedMethods())

// 启动服务器
app.listen(5001)
console.log('服务器启动成功')
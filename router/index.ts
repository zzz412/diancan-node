import Router from 'koa-router'
import authRouter from './admin/auth'
import shopInfoRouter from './admin/shop-info'

const router = new Router()

// 添加后台验证模块
router.use('/admin', authRouter)
router.use('/admin', shopInfoRouter)

export default router
import Router from 'koa-router'
import authRouter from './admin/auth'

const router = new Router()

// 添加后台验证模块
router.use('/admin', authRouter)

export default router
import Router from 'koa-router'
import authRouter from './admin/auth'
import shopInfoRouter from './admin/shop-info'
import dishRouter from './admin/dish'

import authRouter2 from './mini/auth'

const router = new Router()

// 添加后台验证模块
router.use('/admin', authRouter)
router.use('/admin', shopInfoRouter)
router.use('/admin', dishRouter)

router.use('/mini', authRouter2 )

export default router
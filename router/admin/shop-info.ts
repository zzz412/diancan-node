// 商家信息操作模块
import Router from 'koa-router'
import fs from 'fs/promises'
import qn from '../../config/qn'
import upload from '../../middleware/upload'

const router = new Router({ prefix: '/shopInfo' })

// * 上传图片 【单图上传】
router.post('/upload', upload.single('ys'), async (ctx) => {
  // 1. 将本地图片上传到七牛云中
  const url = await qn.upload(ctx.file)
  // 2. 删除本地图片
  await fs.rm(ctx.file.path)
  // 3. 响应图片URL
  ctx.success(url)
})

// * 更新商家信息
router.post('/', async (ctx) => {
  
})

// * 获取商家信息
router.get('/', async (ctx) => {
  
})

export default router.routes()
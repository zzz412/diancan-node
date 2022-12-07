// 商家信息操作模块
import Router from 'koa-router'
import fs from 'fs/promises'
import qn from '../../config/qn'
import upload from '../../middleware/upload'
import validator from '../../middleware/validator'
import { shopInfoRules } from '../../rules/authRules'
import flq from '../../SQLConnect'

const router = new Router({ prefix: '/shopInfo' })

const shopUser = flq.from('shop_user')

// * 上传图片 【单图上传】
router.post('/upload', upload.single('ys'), async (ctx) => {
  // 1. 将本地图片上传到七牛云中
  const url = await qn.upload(ctx.file)
  // 2. 删除本地图片
  await fs.rm(ctx.file.path)
  // 3. 响应图片URL
  ctx.success(url)
})

// * 更新商家信息 【修改操作】
router.post('/', validator(shopInfoRules)  ,async (ctx) => {
  // 1. 获取字段名
  const { nickname, address, logo }  = ctx.request.body
  // 获取token中的数据
  const { uid } = ctx.state.user
  // 2. 更新商家信息【根据UID去修改】
  const { affectedRows } = await shopUser.where({ uid }).set({ nickname, address, logo }).update()
  if (!affectedRows) return ctx.error('更新失败')
  // 3. 操作成功
  ctx.success()
})

// * 获取商家信息
router.get('/', async (ctx) => {
  // 1. 获取uid
  const { uid } = ctx.state.user
  // 2. 根据uid查询对应信息【指定返回字段  field() 】
  const info = await shopUser.where({ uid }).field('nickname', 'address', 'logo', 'uid').first()
  if (!info.nickname) return ctx.success({})
  // 3. 返回数据
  ctx.success(info)
})

export default router.routes()
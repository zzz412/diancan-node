import Router from 'koa-router'
import flq from '../SQLconnect'
// 配置flq需要操作的表名
const shop_user = flq.from('shop_user')

const router = new Router()

router.get('/', async (ctx) => {
  // 查询shop_user表
  // 2. 执行操作 【查询 find() 】  【修改 update() 】 【删除 remove() 】 【增加 add() 】
  const data = await shop_user.find()
  // 3. 将数据响应
  ctx.success(data)
})

// 根据条件去查询  id  或者  phone
router.get('/tj', async (ctx) => {
  const { id, phone } = ctx.query as any
  // 执行操作需要连写【步进式】  默认使用 AND 连接条件
  const data = await shop_user.where({ id, phone }, 'OR').find()
  ctx.success(data)
})

// 增加商家信息
router.post('/', async (ctx) => {
  // 1. 解析参数值
  const { phone, password } = ctx.request.body
  // 2. 配置操作  value()设置数据
  await shop_user.value({ phone, password }).add()
  // 3. 响应结果
  ctx.success()
})

// 修改商家信息  id去修改 商家名、商家地址、商家logo
router.put('/',async (ctx) => {
  // 1. 解析参数值
  const { id, nickname, address, logo } = ctx.request.body
  // 2. 配置操作  set()设置数据
  await shop_user.where({ id }).set({ nickname, address, logo }).update()
  // 3. 响应结果
  ctx.success([], '修改成功')
})

// 删除商家信息 id去删除
router.delete('/', async (ctx) => {
  // 1. 解析参数值
  const { id } = ctx.query as any
  // 2. 配置操作
  await shop_user.where({ id }).remove()
  // 3. 响应结果
  ctx.success()
})


export default router
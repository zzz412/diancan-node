// 菜品管理模块接口
import dayjs from 'dayjs'
import Router from 'koa-router'
import validator from '../../middleware/validator'
import { dishCateRules, dishCateRules2, dishDataRules, dishDataRules2, dishUnitRules } from '../../rules/dishRules'
import flq from '../../SQLConnect'
import { PageResult } from '../../types/interface'

const router = new Router({ prefix: '/dish' })

const dish_cate = flq.from('dishes_cate')
const dish_unit = flq.from('dishes_unit')
const dish_data = flq.from('dishes_data')

// -------  菜品类目  --------
// * 查询类目【分页、rank升序】
router.get('/cate', async (ctx) => {
  // 分页： 参数  ->  page 页码  pageSize 每页条数
  //       响应  ->  page 当前页  total 总条数  pageSize 每页条数  totalPage 总页数  list 数据
  // 1. 解析参数
  const { page = 1, pageSize = 10 } = ctx.query as any
  const { uid } = ctx.state.user
  // 2. 查询类目 分页【limit({ size: 每页条数, page: 当前页 })】  排序【order({ 字段: 规则 })】
  const { total, data } = await dish_cate.where({ uid }).limit({ size: pageSize, page: page }).order({ rank: 1 }).findRows()
  const totalPage = Math.ceil(total / pageSize )
  // 3. 处理响应字段
  const result: PageResult  = { page: +page, total, pageSize: +pageSize, totalPage, list: data }
  ctx.success(result)
})

// * 增加类目【保证label的唯一性】
router.post('/cate', validator(dishCateRules), async (ctx) => {
  // 需要的参数:  label  value  rank
  // 1. 解析参数
  const { uid } = ctx.state.user
  // 2. 查询label是否重复
  const has = await dish_cate.where({ uid, label: ctx.data.label }).first()
  if (has) return ctx.error('该类目名重复', 202)
  // 3. 新增类目
  await dish_cate.value({ uid, ...ctx.data }).add()
  ctx.success()
})

// * 修改类目【保证label的唯一性、label修改后需要更新对应菜品的类目名】
router.put('/cate', validator(dishCateRules2) ,async (ctx) => {
  // 需要的参数 【id, label?, value?, rank?】
  const { uid } = ctx.state.user
  const { id, label } = ctx.data
  // 1. 验证label的唯一性【不能是自己】
  const has = await dish_cate.where({ uid, label }).first()
  if (has && has.id != id) return ctx.error('label重复', 202)
  // 2. 执行修改操作
  await dish_cate.where({ uid, id }).set(ctx.data).update()
  // 3. 修改对应label的菜品【label修改了】
  if (!has) {
    await dish_data.where({ uid, cid: id }).set({ category: label }).update()
  }
  ctx.success()
})

// * 删除类目【uid与id作为条件、该类目没有菜品才能删除】
router.delete('/cate/:id', async (ctx) => {
  // 1. 解析参数
  const { id } = ctx.params
  const { uid } = ctx.state.user
  // 2. 判断该类目是否有菜品
  const has = await dish_data.where({ uid, cid: id }).first()
  if (has) return ctx.error('有菜品! 不能删除', 202)
  // 3. uid与id作为条件删除
  const { affectedRows } = await dish_cate.where({ uid, id }).remove()
  if (!affectedRows) return ctx.error('菜品ID有误', 202)
  ctx.success()
})

// -------  菜品单位  --------
// * 增加单位
router.post('/unit', validator(dishUnitRules) , async (ctx) => {
  // 1. 获取参数 label value
  const { label } = ctx.data
  const { uid } = ctx.state.user
  // 2. 判断单位名是否重复
  const hasOne = await dish_unit.where({ uid, label }).first()
  if (hasOne) return ctx.error('单位名重复', 202)
  // 3. 添加单位
  await dish_unit.value({ ...ctx.data, uid }).add()
  ctx.success()
})

// * 获取单位
router.get('/unit' ,async (ctx) => {
  // 1. 获取uid
  const { uid } = ctx.state.user 
  // 2. 根据UID查询单位列表
  const data = await dish_unit.where({ uid }).find()
  // 3. 响应结果
  ctx.success(data)
})

// -------  菜品信息  --------
// 新增菜品【1. 校验参数有效性 2. 添加】
router.post('/data', validator(dishDataRules) ,async (ctx) => {
  // 1. 解析参数值
  const { uid } = ctx.state.user
  const time = dayjs().format('YYYY-MM-DD hh:mm:ss')
  // 任务:  校验cid的有效性    校验单位的有效性
  // 2. 添加菜品
  await dish_data.value({ ...ctx.data, time, uid }).add()
  // 3. 响应结果
  ctx.success()
})

// 获取菜品列表【1. 校验参数有效性  2. 分页  3. 高级查询【菜品类目、菜品名、菜品状态】  】
router.get('/data', async (ctx) => {
  // 1. 获取参数
  const { page = 1, pageSize = 10, cid, name = '', onsale } = ctx.query as any
  const { uid } = ctx.state.user
  // 2. 查询菜品【传递了就查不传递就不查】 
  const { total, data } = await dish_data.where({ uid, cid, name: { com: 'LIKE', val: `%${name}%` }, onsale: onsale === '' ? undefined : onsale}).limit({ size: pageSize, page }).order({ rank: 1 }).findRows()
  const totalPage = Math.ceil( total / pageSize)
  // 3. 响应数据
  const result: PageResult = { page: Number(page), pageSize: Number(pageSize), total, totalPage, list: data }
  ctx.success(result)
})

// 获取菜品详情【id】
router.get('/data/:id',async (ctx) => {
  // 1. 解析参数
  const { id } = ctx.params
  const { uid } = ctx.state.user
  // 2. 查询菜品
  const data = await dish_data.where({ uid, id }).field().first()
  // 3. 响应结果
  ctx.success(data)
})

// 修改菜品
router.put('/data', validator(dishDataRules2) ,async (ctx) => {
  // 1. 解析参数
  const { id } = ctx.data
  const { uid } = ctx.state.user
  // 2. 执行修改
  const { affectedRows } = await dish_data.where({ uid, id }).set(ctx.data).update()
  if (!affectedRows) return ctx.error('id有误', 202)
  ctx.success()
})

// 上下架菜品  /dish/data/1/0
router.put('/data/:id/:state',async (ctx) => {
  // 1. 解析参数
  const { id, state } = ctx.params
  const { uid } = ctx.state.user
  // 校验菜品状态 0 1
  if (!['0', '1'].includes(state)) return ctx.error('菜品状态有误', 202)
  // 2. 修改菜品状态
  const { affectedRows } = await dish_data.where({ uid, id }).set({ onsale: state }).update()
  if (!affectedRows) return ctx.error('id有误', 202)
  ctx.success()
})

export default  router.routes()
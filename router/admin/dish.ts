// 菜品管理模块接口
import Router from 'koa-router'
import validator from '../../middleware/validator'
import { dishCateRules, dishUnitRules } from '../../rules/dishRules'
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
  const data = await dish_cate.where({ uid }).limit({ size: pageSize, page: page }).order({ rank: 1 }).find()
  const total = await dish_cate.where({ uid }).count() as number
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






export default  router.routes()
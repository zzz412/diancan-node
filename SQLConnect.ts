// 1. 导入flq
import { Flq } from 'flq'

// 2. 实例化flq 配置连接
const flq = new Flq({
  // 开启长连接
  pool: true,
  // 数据库登录名
  user: 'root',
  // 数据库登录密码
  password: '123123',
  // 数据库名
  database: 'diancan2'
})

// 3. 导出连接好的flq实例
export default flq
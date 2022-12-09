// 分页响应结果
export interface PageResult<T = any> {
  page: number
  pageSize: number
  total: number
  totalPage: number
  list: Array<T>
}
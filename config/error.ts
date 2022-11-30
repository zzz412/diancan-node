// 自定义错误类
class ResultError extends Error {
  msg: string
  code: number
  constructor(msg: string, code: number) {
    super()
    this.msg = msg
    this.code = code
  }
}

export default ResultError

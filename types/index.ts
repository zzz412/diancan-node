// 扩展koa与koa-router的类型方法
import 'koa'
import 'koa-router'

declare module 'koa' {
  interface DefaultContext {
    error: (msg: string, code?: number) => void
    success: (data?: any, msg?: string, code?: number) => void
  }
}

declare module 'koa-router' {
  interface IRouterParamContext {
    error: (msg: string, code?: number) => void
    success: (data?: any, msg?: string, code?: number) => void
  }
}
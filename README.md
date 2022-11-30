# 项目文档
先分析项目  ->   扫码点餐（小程序端、PC管理端、服务端接口）  ->  小程序端、PC管理端【前端】  服务端接口【后端】

-> 前端【构建静态页面】   后端【分析业务需求】   ->  前端【调用接口 联动数据】  后端【实现业务逻辑, 提交接口调用】

-> 项目自测【核心功能】  ->  打包 部署 上线

项目阶段: 
            开发  ->   测试   ->   维护


## 后端- 分析项目业务需求
PC管理端： 【多商家平台 ->  不同账号登录不同的店铺】

+ 商家模块【商家与商家之间互不关联  数据是独立的】
  1. 商家注册   商家登录 
       【手机号、密码】
     A -> 羊肉串  B ->  牛肉串 
  2. 商家信息（查询、修改）
       【商家名、商家地址、商家Logo】

+ 菜品模块
  1. 菜品类目 （查询、增加、删除、修改）
      【类目名、排序值】
  2. 菜品单位 （查询、增加、删除） 
      【单位名】
  3. 菜品 （查询、增加、删除、修改、修改上下架）
      【类目、菜名、单价、单位、状态、图片】

小程序端：


## 后端- 搭建服务器 编写接口

### 需要下载的模块
koa       【用于构建项目】
koa-body 【用于解析post请求参数】
koa-router 【用于后端路由】
koa2-cors  【用于跨域】
nodemon    【用于热更新项目】
async-validator 【用于参数字段校验】

### 初始化git仓库
`git init`

## 初始化ts配置文件
`tsconfig.json`  tsc --init

### 配置路由规则

### 服务器异常处理 中间件
1. 怎么捕获异常 【try... catch】
2. 在哪个地方去捕获 【全局处理】

### 统一响应格式

### 扩展ctx上下文对象 类型
1. 新建 `types/index.ts`文件
``` ts
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
```
2. 在 `app.ts` 导入
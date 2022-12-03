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

### 初始化ts配置文件
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

### 学习FLQ的使用
介绍:  用于快速查询Mysql的应用库   优点： 简便

示例
+ 以前:
  `db.query('select * from student where id = ?', 1)`
+ 现在:
  `flq.form('student').where({ id: 1 }).find()`

安装:
  `yarn add flq`

配置(连接数据库): 
1. 创建数据库 `diancan`
2. 创建商家表【shop_user】 ->  
  id[表id]          ->   int（整数类型）      主键自增
  phone[手机号]     ->   varchar（字符串类型）
  password[密码]    ->   varchar（字符串类型）
  nickname[商家名]  ->   varchar（字符串类型）
  address[商家地址] ->   varchar（字符串类型） 
  logo[商家Logo]    ->   varchar（字符串类型）
  uid[商家id]       ->   varchar（字符串类型）
3. 配置flq进行连接数据库
4. 测试连接效果

## 后端-  注册/登录接口

### JWT的使用
1. 安装:  `yarn add koa-jwt`
2. 配置秘钥: YYDS
3. 开启JWT认证
4. 处理认证错误
5. 生成Token: `jsonwebtoken`
6. 如何携带Token: 在请求头中携带 -> Authorization: `Bearer <token>`

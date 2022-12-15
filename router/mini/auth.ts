import Router from 'koa-router'
import Axios from 'axios'
import { wx_appid, wx_secret, wx_url } from '../../config'
import WXBizDataCrypt from '../../utils/WXBizDataCrypt'
const router = new Router({ prefix: '/auth' })

// 小程序端
// 1. wx.login     ->   code【用户登录码】
// 2. 授权用户信息  ->  用户信息（加密）
// 3. 将用户信息（加密）和 code【用户登录码】 发送给 服务器端


// 服务器端 
// 1. 接收 用户信息（加密）和 code【用户登录码】
// 2. 发起请求给微信服务器端进行用户登录 ->  获取用户session和用户ID
//  code【用户登录码】
//  后端发送网络请求 ???  request(axios)  ->  ajax(axios)
// 3. 使用session_key 解析用户信息（加密） ->   用户信息
// 4. 保存当前用户信息

// 小程序登录
router.post('/login',async (ctx) => {
  // 1. 解析参数
  const { code, encryptedData, iv } = ctx.request.body
  console.log(encryptedData, iv)
  // 2. 发起请求【微信服务器】  获取session_key和openid
  const params = { appid: wx_appid, secret: wx_secret, js_code: code, grant_type: 'authorization_code' }
  const url = wx_url + '/sns/jscode2session'
  const { data } = await Axios.get(url, { params })
  // 3. 判断是否登录成功
  if (data.errcode) return ctx.error('认证失败', 202)
  const { openid, session_key } = data
  // 4. 将加密信息进行解析
  const info = new WXBizDataCrypt(wx_appid, session_key).decryptData(encryptedData, iv)
  console.log(info)
  ctx.success()
})

export default router.routes()
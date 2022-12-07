import { Rules } from 'async-validator'

// 注册模块校验规则
export const registerRules: Rules = {
  phone: [
    { required: true, message: '手机号不能为空' },
    { pattern: /1[23456789]\d{9}/, message: '手机号不符合规则'}
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { min: 6, max: 12, message: '密码长度要求6-12' }
  ]
}

// 商家信息更新校验规则
export const shopInfoRules: Rules = {
  nickname: { required: true, message: '商家名不能为空'  },
  address: { required: true, message: '商家地址不能为空'  },
  logo: { type: 'url', required: true, message: 'Logo不能为空'  }
}
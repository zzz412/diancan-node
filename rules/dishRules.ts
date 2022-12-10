import { Rules } from 'async-validator'

// 菜品单位规则
export const dishUnitRules: Rules = {
  label: { required: true, message: '单位名不能为空' },
  value: { required: true, message: '单位值不能为空' }
}

// 菜品类目规则
export const dishCateRules: Rules = {
  label: { required: true, message: '类目名不能为空' },
  value: { required: true, message: '类目值不能为空' },
  rank: { required: true, message: '排序值不能为空' }
}

export const dishCateRules2: Rules = { 
  id: { required: true, message: '类目id不能为空' },
  ...dishCateRules
}
import { Rules } from 'async-validator'

// 菜品单位规则
export const dishUnitRules: Rules = {
  label: { required: true, message: '单位名不能为空' },
  value: { required: true, message: '单位值不能为空' }
}
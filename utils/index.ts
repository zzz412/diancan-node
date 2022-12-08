// 工具类函数库

// * 过滤对象属性【将对象按照想要的属性 进行过滤】
export const filterKeys = (obj: Object, props: Array<string>) => {
  // 1. 循环对象
  const keys = Object.keys(obj)
  return keys.reduce((n_obj, key) => {
    // 2. 判断当前key是否存在于props中
    if (props.includes(key))  n_obj[key] = obj[key]
    return n_obj
  }, {})
}
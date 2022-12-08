// 过滤对象属性函数  
// 例如:  { a: 1, b: 2, c: 3, d: 4 }   ['a', 'b', 'c']
// 需求:  将对象按照想要的属性 进行过滤
// 思路:  1. 循环对象   2. 判断当前循环值 是否存在于属性数组中  3. 将需要的属性与值添加到新对象中

const filterKeys = (obj: Object, props: Array<string>) => {
  // 1. 循环对象
  const keys = Object.keys(obj)
  return keys.reduce((n_obj, key) => {
    // 2. 判断当前key是否存在于props中
    if (props.includes(key))  n_obj[key] = obj[key]
    return n_obj
  }, {})
}

console.log(filterKeys({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'b', 'c']))
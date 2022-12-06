import multer from '@koa/multer'

// 初始化上传中间件【1. 指定对应目录  2. 重命名文件】
const storage = multer.diskStorage({
  // 存储前端传来的文件
  destination: (req, file, cb)=> { 
      cb(null, 'uploads')
  },
  // 重命名文件
  filename: (req, file, cb) => {
    // 解析后缀
    const fix = file.originalname.split('.').at(-1)
    // 命名规则:  公司名 + 当前时间戳 + 随机数 + 后缀
    const name = `ys-${Date.now()}-${Math.floor(Math.random() * 10000)}.${fix}`
    cb(null, name)
  }
})

const upload = multer({ storage })

export default upload

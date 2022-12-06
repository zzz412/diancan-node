// * 七牛对象存储模块
import qiniu from 'qiniu'
import { File } from '@koa/multer'
import { qiniu_accessKey, qiniu_bucket, qiniu_secretKey, qiniu_url } from '../config'

class Qn {
  constructor() {}
  // 获取上传凭证
  getToken() {
    // 1. 设置上传空间
    const putPolicy = new qiniu.rs.PutPolicy({ scope: qiniu_bucket })
    // 2. 设置AK与SK
    const mac = new qiniu.auth.digest.Mac(qiniu_accessKey, qiniu_secretKey)
    // 3. 获取上传凭证
    const uploadToken = putPolicy.uploadToken(mac)
    return uploadToken
  }

  // 上传方法
  upload(file: File) {
    // 1. 设置上传配置
    const config = new qiniu.conf.Config()
    // @ts-ignore
    config.zone = qiniu.zone.Zone_z2
    // 2. 获取上传方法
    const formUploader = new qiniu.form_up.FormUploader(config)
    // 3. 获取上传压缩方法
    const putExtra = new qiniu.form_up.PutExtra()
    // 4. 调用上传方法
    return new Promise((resolve, reject) => {
      formUploader.putFile(this.getToken(), file.filename, file.path, putExtra, function(respErr, respBody, respInfo) {
        // 上传失败
        if (respErr) {
          reject(respErr)
          throw respErr;
        }
        // 判断状态码是否为200
        if (respInfo.statusCode == 200) {
          resolve(qiniu_url + respBody.key)
        } else {
          reject({ code: respInfo.statusCode, msg: respBody })
        }
      })
    })
  }
} 

export default new Qn()
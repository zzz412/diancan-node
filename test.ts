import qiniu from 'qiniu'
import { qiniu_accessKey, qiniu_bucket, qiniu_secretKey, qiniu_url } from './config'

// 1. 设置上传空间
const putPolicy = new qiniu.rs.PutPolicy({ scope: qiniu_bucket })
// 2. 设置AK与SK
const mac = new qiniu.auth.digest.Mac(qiniu_accessKey, qiniu_secretKey)
// 3. 获取上传凭证
const uploadToken = putPolicy.uploadToken(mac)

// 4. 设置上传配置
const config = new qiniu.conf.Config()
// @ts-ignore
config.zone = qiniu.zone.Zone_z2

// 5. 获取上传方法
const formUploader = new qiniu.form_up.FormUploader(config)
// 6. 获取上传压缩方法
const putExtra = new qiniu.form_up.PutExtra()

// 7. 调用上传方法
formUploader.putFile(uploadToken, 'kb.png', 'C://Users//13921//Pictures//bjtmzbv032e.png', putExtra, function(respErr, respBody, respInfo) {
  // 上传失败
  if (respErr) {
    throw respErr;
  }
  // 判断状态码是否为200
  if (respInfo.statusCode == 200) {
    console.log( qiniu_url + respBody.key);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
})

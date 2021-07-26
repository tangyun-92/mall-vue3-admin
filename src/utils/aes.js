/*
 * @Author: 唐云
 * @Date: 2021-07-26 17:16:25
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-26 17:25:42
 * AES加密
 */
import CryptoJS from 'crypto-js/crypto-js'

//  KEY 和 iv 是后端给我的
const aseKey = 'admin'
const iv = '4490d2ded4f2d4ad'
// 使用的是ECB模式
export default {
  Encrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(aseKey)
    var ivs = CryptoJS.enc.Utf8.parse(iv)
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: ivs,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  Decrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(aseKey)
    var ivs = CryptoJS.enc.Utf8.parse(iv)

    var decrypt = CryptoJS.AES.decrypt(data, key, {
      iv: ivs,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }
}

/*
 * @Author: 唐云
 * @Date: 2021-07-26 17:16:25
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-07-26 22:34:29
 * AES加密
 */
import CryptoJS from 'crypto-js'

export default {
  // 加密
  encrypt(word, keyStr, ivStr) {
    keyStr = keyStr || 'mallvue3admin666'
    ivStr = ivStr || 'mallvue3admin888'
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const srcs = CryptoJS.enc.Utf8.parse(word)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
  },
  // 解密
  decrypt(word, keyStr, ivStr) {
    keyStr = keyStr || 'mallvue3admin666'
    ivStr = ivStr || 'mallvue3admin888'
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)

    var decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
  }
}

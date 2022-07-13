/*
 * @Description: 😎在这里写你的描述
 * @Autor: 曹老板
 * @Date: 2022-03-23 09:13:50
 * @LastEditTime: 2022-03-23 09:27:42
 */

export function checkError(val: any) {
  let err
  val = val.toString(val)
  if (val.includes('2s中内不可再次请求')) {
    err = '2s中内不可再次请求'
  } else {
    err = val
  }
  console.log('🤡 ~~ err', err)
  return err
}

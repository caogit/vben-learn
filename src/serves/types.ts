/*
 * @Description: serves公共接口类型
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-20 10:56:23
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-20 11:18:33
 */
/* 这里是因为接口里的data可能不一定是固定的类型,但考虑到类型可能太多就设置any */
export interface IDataType<T = any> {
  code: number
  data: T
}

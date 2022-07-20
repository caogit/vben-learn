export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const LAYOUT = () => import('/@/layouts/default/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      })
    })
}

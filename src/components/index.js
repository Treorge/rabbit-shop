//通用组件全局注册插件
import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/XtxSku/index.vue'

export const componentsPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
  },
}

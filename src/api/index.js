// 将产品下的4个模块请求接口i函数统一暴露
import * as trademark from './product/tradeMark.js'
import * as attr from './product/attr.js'
import * as sku from './product/sku.js'
import * as spu from './product/spu.js'

export default {
    trademark,
    attr,
    spu,
    sku
}
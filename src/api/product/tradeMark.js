// 品牌管理api

import request from '@/utils/request'

// 品牌列表分页 /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get'
    })
}

// 添加品牌 /admin/product/baseTrademark/save   --需要携带参数 logUrl，tmName
// 修改品牌 /admin/product/baseTrademark/update -- 携带id、logoUrl、tmName
export const reqAddOrUpdateTradeMark = (tradeMarkData) => {
    if(tradeMarkData.id) {
        return request({
            url: `/admin/product/baseTrademark/update`,
            data: tradeMarkData,
            method: 'put'
        })
    } else {
        return request({
            url: `/admin/product/baseTrademark/save`,
            data: tradeMarkData,
            method: 'post'
        })
    }
}

// 删除品牌 /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => {
    return request({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: 'delete'
    })
}


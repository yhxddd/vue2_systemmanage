// 平台属性管理api
import request from '@/utils/request'

// 一级分类   /admin/product/getCategory1
export const reqGetCategory1List = () => {
    return request({
        url:'/admin/product/getCategory1', 
        method:'get'
    })
}

//  二级分类 /admin/product/getCategory2/{category1Id} 
export const reqGetCategory2List = (categoryId) => {
    return request({
        url:`/admin/product/getCategory2/${categoryId}`, 
        method:'get'
    })
}

//  三级分类 /admin/product/getCategory3/{category2Id} 
export const reqGetCategory3List = (category2Id) => {
    return request({
        url:`/admin/product/getCategory3/${category2Id}`, 
        method:'get'
    })
}

// 平台属性数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrList = (category1Id,category2Id,category3Id) => {
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, 
        method:'get'
    })
}
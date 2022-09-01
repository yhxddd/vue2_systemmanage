// 引入axios二次封装
import request from '@/utils/request'

// 通过axios发起请求获取table的列表
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

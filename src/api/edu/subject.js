import request from '@/utils/request'

export default {
  // 1. 分页条件查询
  getSubjects() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get',
    })
  }
}

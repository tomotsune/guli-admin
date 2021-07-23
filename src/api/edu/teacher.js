import request from '@/utils/request'

export default {
  // 1. 分页条件查询
  getPageList(page, limit, searchObj) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 2. 删除讲师
  deleteTeacherId(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}

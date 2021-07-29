import request from '@/utils/request'

export default {
  // 添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  // 查询所有讲师
  getTeachers() {
    return request({
      url: '/eduservice/teacher/findAll',
      method: 'get'
    })
  },
  // 根据课程id查询课程基本信息
  getCourseInfo(id) {
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },
  // 修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/updateCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  // 课程确认信息
  getPublishCourseInfo(id) {
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  },
  publishCourse(id) {
    return request({
      url: `/eduservice/course/publishCourse/${id}`,
      method: 'post'
    })
  },
  // 课程列表
  listCourses() {
    return request({
      url: `/eduservice/course/list`,
      method: 'get'
    })
  },
  deleteCourse(courseId) {
    return request({
      url: `/eduservice/course/delete/${courseId}`,
      method: 'delete'
    })
  }
}

import request from '@/utils/request'

export default {

  // 1. 添加小节
  addVideo(video) {
    return request({
      url: `/eduservice/video/addVideo`,
      method: 'post',
      data:video
    })
  },
  // 2. 根据id查询小节
  getVideo(videoId) {
    return request({
      url: `/eduservice/video/getVideoInfo/${videoId}`,
      method: 'get'
    })
  },
  // 3. 修改章节
  updateVideo(video) {
    return request({
      url: `/eduservice/video/updateVideo`,
      method: 'post',
      data:video
    })
  },
  // 4. 删除
  deleteVideo(videoId){
    return request({
      url: `/eduservice/video/${videoId}`,
      method: 'delete'
    })
  }
}

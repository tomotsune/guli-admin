<template>
  <div class="app-container"><h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div>
        <h2>{{ coursePublish.title }}</h2>
        <p><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类: {{ coursePublish.subjectLevelOne }} - {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>课程讲师: {{ coursePublish.teacherName }}</p>
        <h3>价钱: {{ coursePublish.price }}</h3>
      </div>
    </div>


    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary"
                   @click="publish">发布课程
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course.js'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      coursePublish: {}
    }
  },
  created() {
    this.getCoursePublishInfo()
  },
  methods: {
    // 根据课程id查询
    getCoursePublishInfo() {
      course.getPublishCourseInfo(this.$route.params.id)
        .then(res => this.coursePublish = res.data)
    },
    previous() {
      this.$router.push({path: `/edu/course/chapter/${this.$route.params.id}`})
    },
    publish() {
      course.publishCourse(this.$route.params.id)
        .then(res => {
          this.$message.success('发布成功')
          this.$router.push({path: '/edu/course/list'})
        })
    }
  }
}
</script>

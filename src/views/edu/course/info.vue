<template>
  <div class="app-container"><h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <!--    课程标题-->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视"/>
      </el-form-item>

      <!--      课程分类-->
      <el-form-item label="课程分类">
        <el-cascader
          :change-on-select="true"
          :props="defaultParams"
          :options="subjects"
          v-model="selectedSubjects"
          :clearable="true"
        ></el-cascader>
      </el-form-item>

      <!--      课程讲师-->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>

      <!--      总课时-->
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right"/>
      </el-form-item>

      <!--      课程简介-->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description"/>
      </el-form-item>


      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <!--      课程价格-->
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"/>
        元
      </el-form-item>

      <!--      保存并下一步-->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course.js'
import subject from '@/api/edu/subject.js'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {cover: 'https://files.catbox.moe/pfqhh2.png'},
      teachers: [], //封装所有讲师
      subjects: [{id: ''}],
      selectedSubjects: [],
      BASE_API: process.env.BASE_API,
      defaultParams: {
        label: 'title',
        value: 'id',
        children: 'collection'
      }
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    },
    selectedSubjects(to, from) {
      this.courseInfo.subjectId = this.selectedSubjects[1]
      console.log('selectedSubjects被监视')
    },
    courseInfo(to, from) {
      if (to.subjectId) {
        subject.getSimpleSubjects()
          .then(res => {
            // 获取一级分类
            let primarySubjectId = res.data.find(x => x.id === to.subjectId).parentId
            this.selectedSubjects = [primarySubjectId, to.subjectId]
            console.log('courseInfo被监视', to.subjectId)
          })
      }
    }
  },
  created() {
    this.init()

  },
  methods: {
    init() {
      // 初始化所有讲师
      this.getListTeacher()
      // 初始化课程分类
      this.getSubjects()
      // 判断路径有id值, 做修改
      if (this.$route.params && this.$route.params.id) {
        this.getCourseInfo()

      } else { // 路径美誉id值, 做添加
        // 清空表单
        this.courseInfo = {cover: 'https://files.catbox.moe/pfqhh2.png'}
        this.selectedSubjects = []
      }
    },
    // 根据课程id查询信息
    getCourseInfo() {
      course.getCourseInfo(this.$route.params.id)
        .then(res => this.courseInfo = res.data)
    },
    // 封面上传成功
    handleAvatarSuccess(res, file) {
      this.$message.success('上传成功')
      this.courseInfo.cover = res.data
      console.log(res)
    },
    // 封面上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查询所有课程分类
    getSubjects() {
      subject.getSubjects()
        .then(res => {
          this.subjects = res.data
          console.log('subjects', this.subjects)
        })
    },
    // 查询所有讲师
    getListTeacher() {
      course.getTeachers()
        .then(res => this.teachers = res.data)
    },
    addCourse() {
      course.addCourseInfo(this.courseInfo)
        .then(res => {
          this.$message.success('添加课程信息成功')
          this.$router.push({path: `/edu/course/chapter/${res.data}`})
        })
      console.log('courseInfo', this.courseInfo)
    },
    updateCourse() {
      course.updateCourseInfo(this.courseInfo)
        .then(res => {
          this.$message.success('修改课程信息成功')
          this.$router.push({path: `/edu/course/chapter/${this.courseInfo.id}`})
        })
    },
    saveOrUpdate() {
      // 判断添加还是修改
      if (this.courseInfo.id) {
        this.updateCourse()
      } else {
        this.addCourse()
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right"
                         min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
             因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item label="讲师头像">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/eduoss/fileoss'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary"
                   @click="saveOrUpdate">保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher.js'

export default {
  data() {
    return {
      teacher: {},
      saveBtnDisabled: false, // 保存按钮是否金庸
      BASE_API: process.env.BASE_API,
    }
  },
  created() { // 页面渲染前执行
    this.init()
  },
  watch: {
    // 路由跳转不会销毁页面, 故created只执行一次.
    // 因此需要通过监控路由变化来更改页面数据
    $route(to, from) {
      this.init()
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.teacher.avatar = res.data
    },
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
    init() {
      // 判断路径有id值, 做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id值查询的方法
        this.getInfo(id)
      } else { // 路径美誉id值, 做添加
        // 清空表单
        this.teacher = {}
      }
    },
    getInfo(id) {
      teacher.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data
        })
    },
    saveOrUpdate() {
      // 根据有无id判断
      if (this.teacher.id) {
        // 修改
        this.updateTeacher()
      } else {
        // 添加
        this.saveTeacher()
      }
    },
    saveTeacher() {
      teacher.addTeacher(this.teacher)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          // 回到列表
          this.$router.push({path: '/edu/teacher/list'})
        })
    },
    updateTeacher() {
      teacher.updateTeacher(this.teacher)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // 回到列表
          this.$router.push({path: '/edu/teacher/list'})
        })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

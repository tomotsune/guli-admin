<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag><i class="el-icon-download"/>
          <a href="/static/subject01.xlsx">点击下载模版</a></el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/addSubject'"
          accept="application/vnd.ms-excel,application/msword,application/vnd.ms-powerpoint , application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      importBtnDisabled: false,
      loading: false
    }
  },
  created() {

  },
  methods: {
    // 点击阿牛上传文件到接口
    submitUpload() {
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    // 上传成功
    fileUploadSuccess(res) {
      // 提示
      this.loading = false
      this.$message.success("添加课程分类成功")
      // 跳转课程分类列表
    },
    // 上传失败
    fileUploadError() {
      this.loading = false
      this.$message.error("添加失败")
    }
  }
}
</script>

<style>

</style>

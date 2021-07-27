<template>
  <div class="app-container"><h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-tree
      :data="chapterVideo"
      :props="defaultProps"
      class="filter-tree"
      default-expand-all
    />

    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>


    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下
          一步
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter.js'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false,
      chapter: {},
      chapterVideo: [],
      defaultProps: {
        children: 'collection',
        label: 'title'
      }
    }
  },
  mounted() {
    this.chapter.courseId = this.$route.params.id
  },
  methods: {
    openChapterDialog() {
      // 弹框
      dialogChapterFormVisible = true
      // 清空
      this.chapter = {courseId: this.$route.params.id}
    },
    getChapterVideo() {
      chapter.getChapterVideo(this.chapter.courseId)
        .then(res => this.chapterVideo = res.data)
    },
    addChapter() {
      chapter.addChapter(this.chapter)
        .then(res => {
          // 关闭弹框
          this.dialogChapterFormVisible = false
          // 提示
          this.$message.success('添加章节成功')
          // 刷新页面
          this.getChapterVideo()
        })
    },
    saveOrUpdate() {
      this.addChapter()
    },
    previous() {
      this.$router.push({path: `/edu/course/info/${this.$route.params.id}`})
    },
    next() {
      this.$router.push({path: `/edu/course/publish/${this.$route.params.id}`})
    }
  }
}
</script>

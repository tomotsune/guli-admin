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
      chapterVideo: [],
      defaultProps: {
        children: 'collection',
        label: 'title'
      }
    }
  },
  created() {
    this.getChapterVideo(this.$route.params.id)
  },
  methods: {
    // 根据课程id查询章节小节
    getChapterVideo(id) {
      chapter.getChapterVideo(id)
        .then(res => this.chapterVideo = res.data)
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

<template>
  <div class="app-container"><h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-tree
      :data="chapterVideo"
      default-expand-all :props="defaultProps">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini" @click="editorChapterOrVideo(data.id,node)">
            Edit
          </el-button>
          <el-button
            type="text"
            size="mini" @click="openVideo(data.id)" v-show="node.level===1">
            append
          </el-button>
          <el-button
            type="text"
            size="mini" @click="removeChapterOrVideo(data.id,node)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>

    <!-- 添加和修改章节表单 -->
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
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
        <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio label="true">免费</el-radio>
            <el-radio label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveOrUpdateChapterVideo">确 定
        </el-button>
      </div>
    </el-dialog>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter.js'
import video from '@/api/edu/video.js'

export default {
  data() {
    return {
      defaultParams: {
        label: 'title',
        children: 'collection'
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      chapter: {},
      video: {},
      chapterVideo: [],
      defaultProps: {
        children: 'collection',
        label: 'title'
      }
    }
  },
  created() {
    this.chapter.courseId = this.$route.params.id
    this.getChapterVideo()
  },
  methods: {
    // 1. 打开添加章节对话框
    openChapterDialog() {
      // 弹框
      this.dialogChapterFormVisible = true
      // 清空
      this.chapter = {courseId: this.$route.params.id}
    },
    // 2. 打开添加小节对话框
    openVideo(chapterId) {
      // 弹框
      this.dialogVideoFormVisible = true
      // 设置章节id
      this.video.chapterId = chapterId
      console.log(this.video.chapterId)
    },
    // 3. 删除章节或小节
    removeChapterOrVideo(id, node) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (node.level === 1) {
          chapter.deleteChapter(id).then(res => {
            this.$message.success('删除成功')
            this.getChapterVideo()
          })
        } else {
          video.deleteVideo(id).then(res => {
            this.$message.success('删除成功')
            this.getChapterVideo()
          })
        }

      })
    },
    // 3. 修改章节弹框数据回显
    editorChapterOrVideo(id, node) {
      if (node.level === 1) {
        chapter.getChapter(id)
          .then(res => {
            this.dialogChapterFormVisible = true
            this.chapter = res.data
          })
      } else {
        video.getVideo(id)
          .then(res => {
            this.dialogVideoFormVisible = true
            this.video = res.data
          })
      }
    },
    // 4. 获取课程大纲
    getChapterVideo() {
      chapter.getChapterVideo(this.chapter.courseId)
        .then(res => {
          this.chapterVideo = res.data
          console.log('chapterVideo', this.chapterVideo)
        })
    },
    saveOrUpdateChapter() {
      if (this.chapter.id) {
        chapter.updateChapter(this.chapter)
          .then(res => {
            // 关闭弹框
            this.dialogChapterFormVisible = false
            // 提示
            this.$message.success('修改章节成功')
            // 刷新页面
            this.getChapterVideo()
          })
      } else {
        chapter.addChapter(this.chapter)
          .then(res => {
            // 关闭弹框
            this.dialogChapterFormVisible = false
            // 提示
            this.$message.success('添加章节成功')
            // 刷新页面
            this.getChapterVideo()
          })
      }
    },
    saveOrUpdateChapterVideo() {
      if (this.video.id) {
        video.updateVideo(this.video)
          .then(res => {
            // 关闭弹框
            this.dialogVideoFormVisible = false
            // 提示
            this.$message.success('修改小节成功')
            // 刷新页面
            this.getChapterVideo()
          })
      } else {
        video.addVideo(this.video)
          .then(res => {
            // 关闭弹框
            this.dialogVideoFormVisible = false
            // 提示
            this.$message.success('添加小节成功')
            // 刷新页面
            this.getChapterVideo()
          })
      }
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

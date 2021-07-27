<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>

    <el-tree
      :data="chapterVideo"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import chapter from '@/api/edu/chapter.js'

export default {

  data() {
    return {
      filterText: '',
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
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getChapterVideo(id) {
      chapter.getChapterVideo(id)
        .then(res => this.chapterVideo = res.data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value) !== -1
    }
  }
}
</script>


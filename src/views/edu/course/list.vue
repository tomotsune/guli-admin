<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <!--    不将括号默认传递事件对象给fetchData的第一个参数  -->
      <el-button type="primary" icon="el-icon-search" @click="listCourses">查 询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
    </el-form>

    <el-table
      :data="courseList"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <!--       序号算法 -->
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="200"/>
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal' ? '已发布' : '未发表' }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="课时数"/>
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="viewCount" label="浏览数量" width="60"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/edu/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="deleteCourse(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      courseList: null,
      courseQuery: {}
    }
  },
  created() { // 当页面加载时获取数据
    this.listCourses()
  },
  methods: {
    listCourses() { // 调用api层获取数据库中的数据
      course.listCourses()
        .then(res => this.courseList = res.data)
    },
    resetData() { // 清空的方法
      this.courseQuery = {}
      this.listCourses()
    },
    deleteCourse(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteCourse(id)
          .then(res => {
            this.$message.success('删除成功')
            this.listCourses()
          })
      })
    }
  }
}
</script>
<style scoped>

</style>

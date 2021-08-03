<template>
  <div class="edit">
    <div class="top">
      <span class="left">文章列表</span>
      <span class="right">共计{{total}}篇</span>
    </div>
    <div class="table">
      <div class="table_hd">
        <span>标题</span>
        <span>日期</span>
      </div>
      <div class="table_bd"  v-for="item in blogList">
        <span class="title">{{ item.title }}
        </span>
        <span class="data">{{ item.date }}</span>
        <button @click="deleteArticle(item._id)">删除</button>
        <button @click="articleEdit(item._id)">修改</button>
      </div>
    </div>
    <!-- <el-pagination
      :page-size="20"
      :pager-count="9"
      layout="prev, pager, next"
      :total="100"
      class="pagebox"
    >
    </el-pagination> -->
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      blogList: [],
    };
  },
  mounted: function () {
      // 获取文章列表
      axios.get('http://localhost:3000/api/blogList').then(
        response => this.blogList = response.data.reverse(),
        response => console.log(response)
      )
      
    },
    computed: {
        total: function(){
          // 计算的总数
          return this.blogList.length;
        }
      },
  methods: {
    // 跳转至文章编辑页
      articleEdit: function (id) {
        this.$router.push('/write/' + id)
      },
      // 删除文章
      deleteArticle: function (id) {
        // let self = this
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('http://localhost:3000/api/admin/deleteBlog', {
            _id: id
          }).then(
            response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.fetchData()
            },
            response => {
              console.log(response)
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 更新数据
      fetchData: function () {
        axios.get('http://localhost:3000/api/blogList').then(
          response => this.blogList = response.data.reverse(),
          response => console.log(response)
        )
      }
  }
};
</script>

<style scoped>
.edit {
  margin: 0.5rem auto;
  width: 70%;
  background-color: #f7c3dc83;
  padding: 0.2rem 0.5rem;
  font-size: 0.25rem;
  border-radius: 8px;
}
.top {
  height: 1rem;
  line-height: 1rem;
  border-bottom: 8px solid #f7aacf;
  color: #f7aacf;

}
button {
  width: 1rem;
  height: 0.5rem;
  border-radius: 8px;
  border: 0;
  background-color: #f7aacf49;
  color: #fff;
  font-size: 0.2rem;
  margin-top: 0.1rem;
  margin-left: 0.2rem;
}
button:hover {
  background-color: #f7aacf;
}
.pagebox {
  background-color: rgba(255, 255, 255, 0.384);
  margin-top: 0.3rem;
  text-align: center;
}
.table{
  margin-top: 0.3rem;
  color: #fff;
  
}
.table_hd span{
  margin-right: 4rem;
  
}
.table_bd{
  border-bottom: 1px solid #f7aacf;
  height: 0.7rem;
  line-height: 0.7rem;
}
.table_bd button{
  float: right;
}
.table_bd span{
  width: 3.5rem;
  white-space:nowrap; 
  overflow:hidden; 
  display: inline-block;
  text-overflow: ellipsis;
}
</style>

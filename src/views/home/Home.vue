<template>
  <div class="content" id="blog">
    <Top></Top>
    <div class="container">
      <div class="page">
        <div class="header">
          <h2>博客</h2>
          <span class="total">共计{{total}}篇</span>
        </div>
        <div class="bd">
          <ul>
            <li v-for="item in blogList" key="item._id" @click="BlogDetail(item._id)">
                <div class="artical-item">
                  <h3 class="title">{{item.title}}</h3>
                  <p class="publish_date">发布于{{item.date}}</p>
                  <span class="article_info_label">标签：
                  <span v-if="item.labels.length === 0">未分类</span>
                  <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels" key="tag">{{ tag }}</el-tag>
                  </span>
                  <p class="artical-content">
                    {{item.list}}
                  </p>
                </div>
                <div class="pic">
                  <img src="../../assets/img/bg1.png" alt="" />
                </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
      class="pagebox"
    >
    </el-pagination> -->
    </div>
    
  </div>
</template>

<script>
import Top from '../../components/content/top/top'
import axios from "axios";

export default {
  data() {
      return {
        blogList: []
      }
    },
    components: {
      Top
    },
    computed: {
        total: function(){
          // 计算的总数
          return this.blogList.length;
        }
      },
    mounted: function () {
      axios.get('http://localhost:3000/api/blogList').then(
        response => this.blogList = response.data.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      BlogDetail: function (id) {
        this.$router.push('/detail/' + id)
      }
    }
};
</script>

<style scoped>
.content {
  width: 100%;
  background-color: #f4f4f4;
}
.container {
  width: 80%;
  margin: 30px auto;
  margin-bottom: 0;
}
.header {
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
  border-radius: 0.08rem;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
}
.header h2 {
  float: left;
  padding-left: 0.2rem;
  font-size: 0.3rem;
}
.bd {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
}
.bd ul{
  width: 90%;
  margin: 0.2rem auto;
}
.bd ul li {
  display: inline-block;
  width: 5rem;
  height:2.3rem;
  margin: 0.2rem;
  padding: 0.1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
  font-size: 0.2rem;
  cursor: pointer;

}
.bd .artical-item {
  float: left;
  width: 50%;
}
.publish_date {
  color: #ccc;
}
.artical-item p {
  margin: 0.2rem 0;
}
.artical-content {
  font-size: 0.2rem;
}
.comment-box a {
  margin-right: 0.5rem;
  font-size: 0.2rem;
}
.bd h3 {
  margin-bottom: 0.4rem;
}
.bd span {
  font-size: 0.2rem;
}
.bd .pic {
  float: right;
  overflow: hidden;
  width: 2.2rem;
  border-radius: 12px;
  margin-top: 0.3rem;
}
.bd .pic img {
  width: 100%;
}
.total {
  width: 1.5rem;
  float: right;
  font-size: 0.25rem;
  text-align: center;
  font-weight: 500;
}
</style>

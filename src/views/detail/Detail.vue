<template>
  <div>
    <Top></Top>

    <div class="container" id="artical">
      <a href="artical"></a>
      <div class="img">
        <img src="../../assets/img/bg1.png" alt="" />
      </div>
      <div class="content">
        <span class="iconfont ico" @click="goback">&#xe617;</span>
        <div class="title">
          {{ article.title }}
        </div>
        <p class="publish_date">发布于：{{ article.date }}</p>
        <span class="article_info_label"
          >标签：
          <span v-if="article.labels.length === 0">未分类</span>
          <el-tag
            v-else
            class="tag_margin"
            type="primary"
            v-for="tag in article.labels"
            key="n"
            >{{ tag }}</el-tag
          >
        </span>
        <div class="artical-content" v-html="compiledMarkdown()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../../components/content/top/top";
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; //样式
marked.setOptions({
  hljs: function(code) {
    return hljs.highlightAuto(code).value;
  }
});
export default {
  data() {
    return {
      article: {}
    };
  },
  components: {
    Top
  },
  mounted: function() {
    let id = this.$route.params.id;
    axios
      .get("http://localhost:3001/api/blogDetail/" + id)
      .then(
        response => (this.article = response.data),
        response => console.log(response.data)
      )
      .then(() => {
        setTimeout(() => {
          window.scrollTo(0, 1000);
        });
      });
  },
  methods: {
    compiledMarkdown: function() {
      return marked(this.article.content || "");
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  box-shadow: rgba(165, 159, 159, 0.9) 0px 10px 20px 0px;
  position: relative;
  font-family: 微软雅黑;
  box-sizing: border-box;
  margin: auto auto 0.5rem;
  border-radius: 10px;
  transition: all 0.8s ease 0s;
  margin-top: 0.5rem;
}
.container .img {
  width: 100%;
  overflow: hidden;
  height: 4.5rem;
  border-radius: 10px 10px 0 0;
}
.container img {
  width: 100%;
}
.content {
  padding: 0.25rem;
  padding-top: 0;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  font-size: 0.2rem;
  background-color: #f9f9f9;
}
.title {
  text-align: center;
  font-size: 0.3rem;
  margin-top: 0.3rem;
}
.publish_date {
  line-height: 0.25rem;
  float: right;
  font-size: 0.15rem;
  margin-right: 0.1rem;
}
.artical-content {
  margin-top: 0.5rem;
}
.comment-title {
  margin-top: 0.4rem;
  color: #f7f7;
}
.comment-box textarea {
  width: 8rem;
  height: 2rem;
}
.publish-btn {
  float: right;
  width: 0.8rem;
  height: 0.4rem;
  background-color: #f5f5;
  margin-right: 0.5rem;
}
.iconfont {
  color: #ccc;
}
.ico {
  cursor: pointer;
  display: block;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
</style>

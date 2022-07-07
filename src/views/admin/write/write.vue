<template>
  <div class="write">
    <el-form class="content">
      <el-form-item prop="name">
        标题
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <div class="tag_wrap">
        <span>标签: </span>
        <el-tag
          class="tag_margin"
          :key="tag"
          v-for="tag in labels"
          :closable="true"
          :close-trasition="true"
          @close="handleClose(tag)"
          type="primary"
          >{{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </div>
      <div class="img">
        <span>封面</span>
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-success="handleSuccess">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <el-form-item prop="desc"
        >内容
        <mavon-editor
          class="markdown"
          v-model="content"
          ref="md"
          @change="change"
          @imgAdd="$imgAdd"
          style="min-height: 600px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveArticle" class="submit"
          >发布</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { mavonEditor } from "mavon-editor";
import marked from "marked";
import "mavon-editor/dist/css/index.css";
marked.setOptions({
  hightlight: function(code) {
    return hightlight.hightlightAuto(code).value;
  }
});
export default {
  components: {
    mavonEditor //mavon-editor组件
  },
  data() {
    return {
      title: "",
      date: "",
      content: "",
      list: "",
      labels: [],
      inputVisible: false,
      inputValue: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      img:"",
    };
  },
  mounted: function() {
    if (this.$route.params.id) {
      axios
        .get("http://localhost:3001/api/blogDetail/" + this.$route.params.id)
        .then(
          response => {
            let article = response.data;
            this.title = article.title;
            this.date = article.date;
            this.content = article.content;
            this.list = article.list;
            this.labels = article.labels;
          },
          response => console.log(response)
        );
    }
  },
  methods: {
    change(value, render) {
      //实时获取转成html的数据
      this.html = render;
      console.log(this.html);
    }, // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("image", $file);
      this.$ajax({
        url: "http://local.basic.com/index.php?r=markdown/upload",
        method: "post",
        data: formdata
      }).then(data => {
        //将返回的url替换到文本原位置
        if (data.data.success == 1) {
          this.$refs.md.$img2Url(pos, data.data.url);
          console.log(data.data.url);
        }
      });
    },
    // 延时赋值给content
    update: _.debounce(function(e) {
      this.content = e.target.value;
    }, 300),
    // 获取发表时间
    getDate: function() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      this.date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    },
    // 保存文章
    saveArticle: function() {
      let self = this;
      if (this.title.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (this.content.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入内容",
          type: "warning"
        });
        return;
      }

      if (this.$route.params.id) {
        // 更新文章
        let obj = {
          _id: this.$route.params.id,
          title: this.title,
          date: this.date,
          content: this.content,
          list: this.list,
          labels: this.labels,
          img:this.img,
        };
        axios
          .post("http://localhost:3001/api/admin/updateBlog", {
            articleInformation: obj
          })
          .then(
            response => {
              self.$message({
                message: "更新文章成功",
                type: "success"
              });
              // 更新完成后跳转至该文章的详情页
              self.$router.push("/detail/" + self.$route.params.id);
            },
            response => console.log(response)
          );
      } else {
        // 新建文章
        // 获取时间
        this.getDate();
        let obj = {
          title: this.title,
          date: this.date,
          content: this.content,
          list: this.list,
          labels: this.labels
        };
        axios
          .post("http://localhost:3001/api/admin/saveBlog", {
            articleInformation: obj
          })
          .then(
            response => {
              self.$message({
                message: "发表文章成功",
                type: "success"
              });
              // 保存成功后跳转至文章列表页
              this.refreshArticleList();
            },
            response => console.log(response)
          );
      }
    },
    // 保存成功后跳转至文章列表页
    refreshArticleList: function() {
      this.$router.push("/edit");
    },
    goBack: function() {
      this.$router.go(-1);
    },
    // element标签组件
    handleClose: function(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },
    showInput: function() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function() {
      let inputValue = this.inputValue;
      if (inputValue) this.labels.push(inputValue);
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleSuccess(file) { // 上传照片
      this.upload = true
      this.img = file;
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>

<style scoped>
.write {
  margin: 0.5rem auto;
  margin-bottom: 0;
  width: 70%;
  background-color: #f7c3dc83;
  border-radius: 8px;
  color: #f7aacf;
  font-size: 18px;
}
.submit {
  width: 1.5rem;
  height: 0.5rem;
  border-radius: 8px;
  border: 0;
  margin-top: 0.3rem;
  background-color: #f7c3dca9;
  color: #fff;
  font-size: 0.2rem;
}
.submit:hover {
  background-color: #f1a3c9;
}
.tag_wrap {
  margin-bottom: 0.2rem;
}
.content {
  margin: 0.2rem auto;
  width: 80%;
}
</style>

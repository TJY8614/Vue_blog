<template>
  <div class="admin">
    <div class="header">
    <ul>
      <li><router-link to="/write">写文章</router-link></li>
      <li><router-link to="/edit">编辑文章</router-link></li>
      <!-- <li>留言板</li> -->
      <li><router-link to="/">博客首页</router-link></li>
    </ul>
  </div>
  <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.admin{
  width: 100%;
  background: url('../../assets/img/bg1.png') no-repeat fixed;
  background-size: cover;
}
.header{
  width: 100%;
  height: 0.8rem;
  background-color: #f7c3dc83;
  line-height: 0.75rem;
  text-align: center;
}
.header ul{
  margin-left: 3rem;
}
.header ul li{
  float: left;
  width: 2rem;
  font-size: 0.25rem;
  color: #fff;
  cursor: pointer;
}
.header ul li:hover{
  border-bottom: 5px solid #f7c3dc;
  color: #f7c3dc;
}

</style>
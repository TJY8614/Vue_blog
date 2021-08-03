<template>
  <div class="menu">
        <ul>
          <li><router-link to="/"><span class="iconfont">&#xe633;</span>首页</router-link></li>
          <li><a href="#"><span class="iconfont">&#xe67e;</span>归档</a></li>
          <li><a href="#"><span class="iconfont">&#xe7f9;</span>分类</a></li>
          <li><a href="#"><span class="iconfont">&#xe601;</span>标签</a></li>
          <li><a href="#"><span class="iconfont">&#xe630;</span>留言板</a></li>
          <li><a href="#"><span class="iconfont">&#xe66b;</span>搜索</a></li>
          <li><router-link to="/login"><span class="iconfont">&#xe62e;</span>登录</router-link></li>
        </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .menu{
  float: right;
}
.menu ul li{
  float: left;
  font-size: 0.2rem;
  list-style: none;
  width: 0.8rem;
  margin: 0.1rem;
  color: #fff;
}
</style>
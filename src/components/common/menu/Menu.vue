<template>
  <div class="menu">
    <div class="menu-ico" @click="show = !show">
      <img src="../../../assets/img/menu.svg" alt="">
    </div>
    <transition name="fade">
      <div class="menu-box" v-show="show"> 
      <div class="menu-box-bd">
        <ul>
          <li><router-link :to="{path:'/'}"><span class="iconfont">&#xe633;</span>首页</router-link></li>
          <!-- <li><a href="#"><span class="iconfont">&#xe67e;</span>归档</a></li>
          <li><a href="#"><span class="iconfont">&#xe7f9;</span>分类</a></li>
          <li><a href="#"><span class="iconfont">&#xe601;</span>标签</a></li>
          <li><a href="#"><span class="iconfont">&#xe630;</span>留言板</a></li>
          <li><a href="#"><span class="iconfont">&#xe66b;</span>搜索</a></li> -->
          <li v-show="!isAdmin"><router-link to="/login"><span class="iconfont" >&#xe62e;</span>登录</router-link></li>
          <li @click="logout" v-show="isAdmin"><span class="iconfont">&#xe62e;</span>退出</li>
          <li  v-show="isAdmin"><router-link to="/admin"><span class="iconfont">&#xe636;</span>后台管理</router-link></li>
        </ul>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>
export default {
  data () {
    return {
      show:false,
      isAdmin:false
    }
  },
  mounted () {
    var admin = this.$cookies.get("username");
    if(admin === 'tjy123'){
      this.isAdmin = true;
    }
  },
  methods: {
    logout() {
      this.$cookies.remove("username");
      location.reload();  
    }
  }
}
</script>

<style scoped>
.menu-ico{
  position: absolute;
  z-index: 999;
  cursor: pointer;
}
.menu-box{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
}
.menu-box-bd{
  width: 4rem;
  height: 100%;
  background-color: #8fc4ba;
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s,
}
.fade-enter,
.fade-leave-active{
  transform: translateX(-100%);
}
.menu-box-bd ul{
  padding-top: 1rem;
}
.menu-box-bd li{
  cursor: pointer;
  margin: 0.2rem auto;
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
}
.menu-box-bd span{
  font-size: 0.3rem;
}
</style>
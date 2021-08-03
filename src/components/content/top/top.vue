<template>
  <div>
    <div class="header">
    <Menu></Menu>
      <div class="w">
        <div class="tx">
        <img src="../../../assets/img/syx.jpg" alt="">
        </div>
        <h2>TJY</h2>
        <p>你今天的努力，是幸运的伏笔，把握当下，是明日的花开，风很大，所以要更加努力。</p>
        <div class="btn">
          <button @click="btnScroll">进入博客</button>
        </div>
        <div class="ico">
            <ul>
              <li><span class="iconfont">&#xe629;</span></li>
              <li><span class="iconfont">&#xe66c;</span></li>
              <li><span class="iconfont">&#xe7ab;</span></li>
              <li><span class="iconfont">&#xe612;</span></li>
            </ul>
          </div>
          <div class="sign"><i class="iconfont icon-xiajiantou"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../../common/menu/Menu'
export default {
  components: {
    Menu
  },
  methods: {
    btnScroll(){
      document.documentElement.scrollTop = 880
    }
  }
}
</script>

<style scoped>
.header{
  overflow: hidden;
  width: 100%;
  background: url(../../../assets/img/bg2.png) no-repeat fixed;
  background-size: cover;
}
.w{
  margin: 0 auto;
  text-align: center;
}
.header .tx{
  width: 200px;
  overflow: hidden;
  border: 8px solid #cde3d5;
  border-radius: 50%;
  background-color: #cde3d5;
  margin: 0.8rem auto;
  transition: transform 1.5s;
}
.header h2{
  font-family: serif;
  color: #9decde;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}
.header .tx:hover{
  transform: rotate(360deg);
}
.header .tx img{
  width: 100%;
}
.header p{
  color: #dff1d4;
  font-family: serif;
  font-size: 0.3rem;
  margin-bottom: 0.8rem;
}
.header .btn button{
  width: 1.8rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  background-color: #8fc4ba;
  border: 0;
  font-size: 0.25rem;
  color: #fff;
  transition: width 1s;
  cursor: pointer;
  margin-bottom: 0.3rem;

}
.header .btn button:hover{
  width: 2.3rem;
}
.ico {
  width: 4rem;
  margin: 0.8rem auto;
}
.ico ul li {
  float: left;
  width: 1rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #fff;
}
.ico ul li span {
  font-size: 0.5rem;
}
.ico ul li:nth-child(2n) span {
  font-size: 0.8rem;
}
</style>
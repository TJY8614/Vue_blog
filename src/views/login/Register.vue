<template>
  <div class="main">
    <Menu></Menu>

    <div class="reg">
    <h2>注册</h2>
    <input type="text" name="name" placeholder="用户名" class="input-box" v-model="name">
    <input type="password"  name="password" placeholder="密码" class="input-box" v-model="password">
    <input type="submit" value="注册" class="btn" @click="signup">
  <span>已有账号?</span>
  <router-link to="/login" class="reg-rt">登录</router-link>
  <router-view></router-view>
  </div>
  </div>
  </div>
</template>

<script>
import Menu from "../../components/common/menu/Menu";
import axios from "axios"

export default {
  components: {
    Menu
  },
  data () {
    return {
      name: '',
        password: '',
        hasName: false, // 用户名被占
    }
  },
  methods: {
    signup: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }

        axios.get('http://localhost:3000/api/admin/getUser/' + this.name).then(
          response => {
            if (response.data.name === _this.name) {
              _this.$message.error('该用户已存在')
              _this.name = '';
              // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
              // 所以我把post移入else中，而不是在外面通过判断name执行
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }

              axios.post('http://localhost:3000/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                    _this.$router.push('/login');
                },
                response => console.log('注册失败' + response)
              )
            }
          },
          response => console.log(response)
        )
      },
  }
}
</script>

<style scoped>
.main {
  overflow: hidden;
  width: 100%;
  height: 7.25rem;
  background: url(../../assets/img/bg3.png) no-repeat;
  background-size: over;
}
.reg {
  margin: 1rem auto;
  background-color: #e1f5fa69;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 15px;
  font-size: 0.2rem;
}
.reg h2 {
  text-align: center;
  color: #b7c5e1;
  margin-bottom: 0.5rem;
}
.input-box {
  display: block;
  width: 3rem;
  height: 0.6rem;
  margin-bottom: 0.4rem;
  border: none;
  color: #7588af;
  background-color: #e1f5fa69;
  outline-color: #83a2e0;
  border-radius: 5px;
}
.input-box:hover {
  border: 1px solid #ccc;
}
.btn {
  cursor: pointer;
  width: 3rem;
  height: 0.6rem;
  background-color: #b7c5e1;
  border: 0;
  border-radius: 5px;
  color: #fff;
  margin-bottom: 0.3rem;
}
.btn:hover {
  background-color: #83a2e0;
}
.reg-rt {
  color: #83a2e0;
  text-decoration: none;
}
</style>
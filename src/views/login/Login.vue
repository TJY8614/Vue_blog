<template>
  <div class="main">
    <Menu></Menu>
    <div class="log">
      <h2>登录</h2>
      <input
        type="text"
        placeholder="用户名"
        class="input-box"
        name="username"
        v-model="name"
      />
      <input
        type="password"
        placeholder="密码"
        class="input-box"
        name="psw"
        v-model="password"
        v-on:keyup.enter="signin"
      />
      <input type="submit" value="登录" class="btn" @click="signin" />
      <span>没有账号?</span>
      <router-link to="/register" class="reg-rt">注册</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "../../components/common/menu/Menu";
import axios from "axios";

export default {
  components: {
    Menu
  },
  data() {
    return {
      name: "",
      password: "",
      hasName: false // 用户名被占
    };
  },
  methods: {
    signin: function() {
      let _this = this;
      if (this.name.length < 6) {
        this.$message.error("用户名不能为空或小于六个字符");
        return;
      }

      if (this.password.length < 6) {
        this.$message.error("密码不能为空或小于六个字符");
        return;
      }

      axios.get("http://localhost:3001/api/admin/getUser/" + this.name).then(
        response => {
          if (_this.password !== response.data.password) {
            _this.$message.error("用户名或密码不正确");
          } else {
            let obj = {
              name: _this.name,
              password: _this.password
            };
            axios
              .post("http://localhost:3001/api/admin/signin", {
                userInfo: obj
              })
              .then(
                response => {
                  _this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  // 1天过期，忽略大小写
                  this.$cookies.set("username", _this.name, "1d");
                  delete _this.password;
                  _this.$router.push("/");
                },
                response => console.log("登录失败" + response)
              );
          }
        },
        response => {
          _this.$message.error("该用户不存在");
          return;
        }
      );
    }
  }
};
</script>

<style scoped>
.main {
  overflow: hidden;
  width: 100%;
  height: 7.25rem;
  background: url(../../assets/img/bg3.png) no-repeat;
  background-size: over;
}
.log {
  margin: 1rem auto;
  background-color: #e1f5fa69;
  width: 4rem;
  padding: 0.5rem;
  border-radius: 15px;
  font-size: 0.2rem;
}
.log h2 {
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

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载的方式加载组件
const Home = ()=> import ('../views/home/Home');
const Detail = ()=> import ('../views/detail/Detail');
const Login = ()=> import ('../views/login/Login');
const Register = ()=> import ('../views/login/Register');
const Admin = ()=> import ('../views/admin/Admin');
const Edit = ()=> import ('../views/admin/edit/Edit');
const Write = ()=> import ('../views/admin/write/write');

// import Home from '../views/home/Home'
// import Detail from '../views/detail/Detail'
// import Login from '../views/login/Login'
// import Register from '../views/login/Register'
// import Admin from '../views/admin/Admin'
// import Edit from '../views/admin/edit/Edit'
// import Write from '../views/admin/write/write'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      component: Admin,
      redirect: 'write',
      children:[
        {
          path: '/write',
          component: Write
        },
        {
          path: '/write/:id',
          component: Write
        },
        {
          path: '/edit',
          component: Edit
        }
      ]
    }
  ],
  
})

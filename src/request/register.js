import Cookies from 'js-cookie';
import * as loginRequest from './login'

export const Register = (vm) => {
  vm.$axios.post('/account/register', {
    email: vm.username,
    nickname: vm.nickname,
    password: vm.password
  })
    .then(function (rep) {
      if (rep.status == 200) {
        console.log(vm.nickname)
        Cookies.set('qaUsername', vm.username)
        Cookies.set('qaPassword', vm.password)
        Cookies.set('qaNickname', vm.nickname)

        vm.$Message.success("注册成功，自动登陆中...")
        setTimeout(() => {
          loginRequest.Login(vm)
        }, 500)

      } else {
        vm.$Message.error(rep.data.detail)
        vm.loading = false
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
      vm.loading = false
    })
}



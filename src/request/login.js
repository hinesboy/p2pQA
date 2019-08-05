import Cookies from 'js-cookie';
/* 登陆接口 */
export const Login = (vm) => {
  vm.$axios.post('/account/login', {
    email: vm.username,
    password: vm.password
  })
    .then(function (rep) {
      if (rep.status == 200) {
        Cookies.set('qaUsername', vm.username)
        Cookies.set('qaPassword', vm.password)
        Cookies.set('qaNickname', rep.data.nickname)
        Cookies.set('activeFlag', true)
        vm.$router.push("/dashboard")
      } else {
        vm.$Message.error(rep.data.detail)
      }
    })
    .catch(function (rep) {
      vm.$Message.error(rep.response.data.detail)
      vm.loading = false
    })
}



export default {
    install () {
      Vue.prototype.$http = axios
      Vue.http = axios
    }
  }
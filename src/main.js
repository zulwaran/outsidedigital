import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import money from 'v-money'
import styles from './scss/app.scss'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(money, { precision: 4 })

new Vue({
    styles,
    render: h => h(App),
}).$mount('#app')
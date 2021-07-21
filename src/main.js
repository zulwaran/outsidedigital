import Vue from 'vue'
import App from './App.vue'
import styles from './scss/app.scss'

Vue.config.productionTip = false

new Vue({
    styles,
    render: h => h(App),
}).$mount('#app')
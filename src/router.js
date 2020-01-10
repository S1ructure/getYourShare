import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
        routes: [
            {
                path: '/',
                component: require('./components/share/share.vue').default
            },
            {
                path: '/:id/',
                component: require('./components/share/share.vue').default
            },
        ],
    }
)

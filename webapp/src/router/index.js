import { createRouter, createWebHistory } from "vue-router";
// import components from the views folder to be used here
import a from "../views/a.vue"


const routes = [
    {
        path: 'a',
        name: 'a',
        component: a
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
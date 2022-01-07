import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Comp from "@/views/Comp";
import Test from "@/views/Test";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "r_home",
    component: Home,
  },
  {
    path: "/comp",
    name: "r_comp_stydy",
    component: Comp,
  },
  {
    path: "/test",
    name: "r_test",
    component: Test,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

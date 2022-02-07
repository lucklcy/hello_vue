import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Comp from "@/views/Comp";
import Test from "@/views/Test";
import SvgIndex from "@/views/SvgDot/index";
import SvgPoster from "@/views/SvgDot/Poster";
import CanvasIndex from "@/views/Canvas/index";
import CanvasFabric from "@/views/Canvas/fabric";
import CssIndex from "@/views/ICss/index";
import CssGrid from "@/views/ICss/grid";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "r_home",
    component: Home,
    meta: {
      breadcrumb: [{ path: "/", title: "首页" }],
    },
  },
  {
    path: "/comp",
    name: "r_comp_stydy",
    component: Comp,
    meta: {
      breadcrumb: [
        { path: "/", title: "首页" },
        { path: "/comp", title: "组件生命周期" },
      ],
    },
  },
  {
    path: "/test",
    name: "r_test",
    component: Test,
    meta: {
      breadcrumb: [
        { path: "/", title: "首页" },
        { path: "/test", title: "测试" },
      ],
    },
  },
  {
    path: "/canvas",
    name: "r_canvas_index",
    component: CanvasIndex,
    children: [
      {
        path: "fabric",
        name: "r_canvas_fabric",
        component: CanvasFabric,
        meta: {
          breadcrumb: [
            { path: "/", title: "首页" },
            { path: "/canvas", title: "canvas" },
          ],
        },
      },
    ],
  },
  {
    path: "/svg",
    name: "r_svg_index",
    component: SvgIndex,
    children: [
      {
        path: "poster",
        name: "r_snap_svg_poster",
        component: SvgPoster,
        meta: {
          breadcrumb: [
            { path: "/", title: "首页" },
            { path: "/canvas", title: "营销海报" },
          ],
        },
      },
    ],
  },
  {
    path: "/css",
    name: "r_css_index",
    component: CssIndex,
    children: [
      {
        path: "grid",
        name: "r_css_grid",
        component: CssGrid,
        meta: {
          breadcrumb: [
            { path: "/", title: "css" },
            { path: "/grid", title: "grid布局" },
          ],
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

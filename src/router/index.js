import Vue from "vue";
import VueRouter from "vue-router";
import Main from '@/components/Main'
import Form from '@/components/Form'
import Book from "@/components/Book"
import EditProduct from '@/components/EditProduct'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/form",
    name: "Form",
    commponent: Form,
    props: true,
  },
  {
    path: '/book/:id',
    name: 'Id',
    component: Book,
    props: true,
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: EditProduct,
        props: true,
      }
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

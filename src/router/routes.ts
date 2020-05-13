const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "index" */ "@/views/index.tsx")
  },
  {
    path: "/canvas",
    component: () =>
      import(/* webpackChunkName: "canvas" */ "@/views/canvas/index.tsx")
  },
  {
    path: "/child",
    component: () => import(/* webpackChunkName: "child" */ "@/views/Child.tsx")
  }
  //   {
  //     path: "/about",
  //     name: "about",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
  //   }
];

export default routes;

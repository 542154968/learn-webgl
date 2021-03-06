const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "index" */ "@/views/index.tsx")
  },
  {
    path: "/section2/class1",
    component: () =>
      import(/* webpackChunkName: "section2-1" */ "@/views/section2/Class1")
  },
  {
    path: "/section2/class2",
    component: () =>
      import(/* webpackChunkName: "section2-2" */ "@/views/section2/Class2")
  },
  {
    path: "/section2/class3",
    component: () =>
      import(/* webpackChunkName: "section2-3" */ "@/views/section2/Class3")
  },
  {
    path: "/section2/class4",
    component: () =>
      import(/* webpackChunkName: "section2-4" */ "@/views/section2/Class4")
  },
  {
    path: "/section3/class1",
    component: () =>
      import(/* webpackChunkName: "section3-1" */ "@/views/section3/Class1")
  },
  {
    path: "/section3/class2",
    component: () =>
      import(/* webpackChunkName: "section3-2" */ "@/views/section3/Class2")
  },
  {
    path: "/section3/class3",
    component: () =>
      import(/* webpackChunkName: "section3-3" */ "@/views/section3/Class3")
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

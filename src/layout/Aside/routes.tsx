type RoutesType = {
  path: string;
  name: string;
  icon: string;
  isPage: boolean;
  children?: RoutesType;
}[];

const routes: RoutesType = [
  {
    path: "/",
    name: "WebGL入门",
    icon: "el-icon-s-home",
    isPage: false,
    children: [
      {
        path: "/canvas",
        name: "canvas是什么？",
        icon: "",
        isPage: true
      },
      {
        path: "/webgl",
        name: "webgl是什么？",
        icon: "",
        isPage: true
      }
    ]
  }
];

export default routes;

export { RoutesType };

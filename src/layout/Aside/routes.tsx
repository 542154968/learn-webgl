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
        path: "/section2/class1",
        name: "最短的webgl程序",
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

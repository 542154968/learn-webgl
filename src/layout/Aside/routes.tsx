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
        name: "最短的WebGL程序",
        icon: "",
        isPage: true
      },
      {
        path: "/section2/class2",
        name: "绘制一个点",
        icon: "",
        isPage: true
      },
      {
        path: "/section2/class3",
        name: "WebGL坐标系统",
        icon: "",
        isPage: true
      }
    ]
  }
];

export default routes;

export { RoutesType };

import { createComponent, SetupContext } from "@vue/composition-api";
import { RoutesType } from "../../router/MenuArr";

type PropsType = {
  item: RoutesType[0];
};

export default createComponent({
  props: {
    item: {
      default() {
        return {};
      },
      type: Object
    }
  },
  // 为啥不删这个解构的root  因为这个类型是个坑 用上props之后就不能自动判断了 留下这个为解决方案
  setup(props: PropsType, { root }: SetupContext) {
    const { item } = props;

    function hanldeRouterToPath() {
      event && event.preventDefault();
    }

    return () => (
      <a href={`#${item.path}`} target="_blank" onClick={hanldeRouterToPath}>
        <i class={item.icon}></i>
        <span slot="title">{item.name}</span>
      </a>
    );
  }
});

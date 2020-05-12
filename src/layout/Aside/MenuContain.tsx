import { createComponent, SetupContext } from "@vue/composition-api";
import { RoutesType } from "./routes";

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
  setup(props: PropsType, { root }: SetupContext) {
    const { item } = props;

    function hanldeRouterToPath() {
      event && event.preventDefault();
      item.isPage && root.$router.push(item.path);
    }

    return () => (
      <a onClick={hanldeRouterToPath}>
        <i class={item.icon}></i>
        <span slot="title">{item.name}</span>
      </a>
    );
  }
});

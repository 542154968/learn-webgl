import { createComponent } from "@vue/composition-api";
import MenuContain from "./MenuContain";
import { RoutesType } from "./routes";

type PropsType = {
  child: RoutesType[0];
};

export default createComponent({
  props: {
    child: {
      default() {
        return {};
      },
      type: Object
    }
  },
  setup(props: PropsType) {
    const { child } = props;
    return () => (
      <el-menu-item index={child.path}>
        <MenuContain item={child}></MenuContain>
      </el-menu-item>
    );
  }
});

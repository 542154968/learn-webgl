import { createComponent } from "@vue/composition-api";
import "./index.styl";

export default createComponent({
  name: "gl-head",
  setup() {
    return () => <h1>学习webgl</h1>;
  }
});

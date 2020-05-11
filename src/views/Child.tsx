import { createComponent } from "@vue/composition-api";
import clickEventHook from "../hooks/clickEvent";

export default createComponent({
  setup() {
    // 如果clickHook 传的值不是ref对象 那么就不能解构 不然不会响应变化 可以用toRef(data) 让它变为ref对象
    const { x, y } = clickEventHook();

    return () => (
      <div>
        这是子哦~ {x.value}-{y.value}
      </div>
    );
  }
});

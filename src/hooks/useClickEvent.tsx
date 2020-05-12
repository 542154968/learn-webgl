import { reactive, toRefs } from "@vue/composition-api";
import useEventEmit from "./useEventEmit";

function useClickState() {
  const data = reactive({
    x: 0,
    y: 0
  });

  function handleClick(event: any) {
    const { pageX, pageY } = event;
    data.x = pageX;
    data.y = pageY;
  }

  useEventEmit(window, "click", handleClick);

  // return 方法1： return { ...toRefs(data) }; | return toRefs(data) 这样传出去的解构也可以响应变化
  // return 方法2： return data; 传出去之后 子不能解构 不然不会响应变化
  return toRefs(data);
}

export default useClickState;

import { createComponent } from "@vue/composition-api";

export default createComponent({
  setup(props, { slots }) {
    return () => <div id="nice">{slots.default()}</div>;
  }
});

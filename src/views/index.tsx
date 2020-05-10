import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "App",
  setup() {
    return () => <div>这是首页哦~</div>;
  }
});

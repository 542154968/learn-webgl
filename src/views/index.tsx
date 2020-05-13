import { createComponent, ref, onMounted } from "@vue/composition-api";

export default createComponent({
  name: "App",
  setup(props, { refs }) {
    onMounted(() => {
      console.log(refs.div);
    });

    return () => <div class="page-index" ref="div"></div>;
  }
});

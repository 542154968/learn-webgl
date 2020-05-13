import NiceContain from "@components/NiceContain";
import { createComponent, onMounted } from "@vue/composition-api";
import "@styl/basic.styl";

export default createComponent({
  name: "App",
  setup(props, { refs }) {
    onMounted(() => {
      console.log(refs.div);
    });

    return () => <NiceContain>`let's begin!`</NiceContain>;
  }
});

import { createComponent } from "@vue/composition-api";
import NiceContain from "@components/NiceContain";

export default createComponent({
  setup() {
    return () => <NiceContain>let's begin!</NiceContain>;
  }
});

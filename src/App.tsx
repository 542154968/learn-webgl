import { createComponent } from "@vue/composition-api";
import Layout from "./layout/index";
import "@styl/basic.styl";

export default createComponent({
  name: "App",
  setup() {
    return () => (
      <div id="app">
        <Layout>
          <router-view></router-view>
        </Layout>
      </div>
    );
  }
});

import { createComponent } from "@vue/composition-api";
import HelloWorld from "./components/HelloWorld";
import ImageLogo from "./assets/logo.png";

export default createComponent({
  name: "App",
  setup() {
    return () => (
      <div id="app">
        <img alt="Vue" src={ImageLogo} />
        <el-button>测试element</el-button>
        <HelloWorld
          msg="Welcome to Your Vue.js + TypeScript App"
          eventClick={e => console.log("click", e.target)}
        />
        <router-view></router-view>
      </div>
    );
  }
});

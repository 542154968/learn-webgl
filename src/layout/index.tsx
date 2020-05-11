import { createComponent } from "@vue/composition-api";
import AsideMenu from "./Aside/index.vue";
import Header from "./Header/index";

export default createComponent({
  name: "layout",
  setup(props, { slots }) {
    return () => (
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <AsideMenu></AsideMenu>
          </el-aside>
          <el-main>{slots.default}</el-main>
        </el-container>
      </el-container>
    );
  }
});

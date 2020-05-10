import { createComponent } from "@vue/composition-api";
import AsideMenu from "./Aside.vue";

export default createComponent({
  name: "layout",
  setup(props, { slots }) {
    return () => (
      <el-container>
        <el-header>Header</el-header>
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

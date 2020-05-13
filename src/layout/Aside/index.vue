<template>
  <el-menu :default-active="routerPath" @open="handleOpen" @close="handleClose" router>
    <template v-for="item in routes">
      <el-submenu
        :key="item.path"
        :index="item.path"
        v-if="Array.isArray(item.children) && item.children.length > 0"
      >
        <template slot="title">
          <MenuContain :item="item" />
        </template>
        <MenuItem
          v-for="child in item.children"
          :child="child"
          :key="child.path"
          :index="child.path"
        />
      </el-submenu>
      <MenuItem v-else :child="item" :key="item.path" :index="item.path" />
    </template>
  </el-menu>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, watch } from "@vue/composition-api";
import routes from "./routes";
import MenuItem from "./MenuItem";
import MenuContain from "./MenuContain";
import "./index.styl";

export default createComponent({
  name: "aside-menu",
  components: { MenuItem, MenuContain },
  setup(prop, { root }) {
    const routerPath = ref("");

    let watchNum = 1;

    const watchId = watch(
      () => root.$route.path,
      next => {
        routerPath.value = next;
        watchNum++;
        // 刷新的时候设置高亮路由 需要设置 但是路由更新 ref路由并不会响应更新
        // 所以就通过watch来手动触发更新
        // 更新之后默认高亮就正确了
        // 随着点击 高亮会自动切换
        // 所以就不需要继续监听了
        // 所以在这里终止监听
        watchNum > 2 && watchId();
      }
    );

    function handleOpen() {}

    function handleClose() {}

    return {
      handleOpen,
      handleClose,
      routes,
      routerPath
    };
  }
});
</script>
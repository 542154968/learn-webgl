<template>
  <el-menu
    :default-active="routerPath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
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
import { createComponent } from "@vue/composition-api";
import routes from "./routes";
import MenuItem from "./MenuItem";
import MenuContain from "./MenuContain";

export default createComponent({
  name: "aside-menu",
  components: { MenuItem, MenuContain },
  setup(prop, { root }) {
    function handleOpen() {}
    function handleClose() {}
    return {
      handleOpen,
      handleClose,
      routes,
      routerPath: root.$route.path
    };
  }
});
</script>
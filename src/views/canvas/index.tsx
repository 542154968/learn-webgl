import { createComponent, onMounted } from "@vue/composition-api";
import NiceContain from "@components/NiceContain";
import { getWebGLContext } from "@lib/cuon-utils";

export default createComponent({
  setup(props, { refs }) {
    onMounted(() => {
      initCanvas();
    });

    function initCanvas() {
      const canvas = refs["el-webgl"];
      let gl = getWebGLContext(canvas);
      console.log(gl);
      if (!gl) {
        console.log("Faile to load");
      }
      gl!.clearColor(1, 0.5, 0.5, 3);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
    }

    return () => (
      <NiceContain>
        <canvas id="wegbl" ref="el-webgl" width="400" height="400"></canvas>
      </NiceContain>
    );
  }
});

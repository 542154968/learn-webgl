import { createComponent, onMounted } from "@vue/composition-api";
import CodeView from "@components/CodeView";
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
      if (!gl) {
        console.log("Faile to load");
      }
      gl!.clearColor(1, 0.5, 0.5, 3);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
    }

    return () => (
      <NiceContain>
        <canvas id="wegbl" ref="el-webgl" width="400" height="400"></canvas>
        <CodeView
          code={`
          const canvas = refs["el-webgl"];
          let gl = getWebGLContext(canvas);
          if (!gl) {
            console.log("Faile to load");
          }
          
          // rgba
          // 背景色在下一次调用gl.clearColor之前不会变
          gl!.clearColor(1, 0.5, 0.5, 3);

          // 清空绘图区域实际上是清除颜色缓冲区 所以传入的是个COLOR_BUFFER_BIT
          // gl.clear继承与OpenGL
          gl!.clear(gl!.COLOR_BUFFER_BIT);

          `}
        ></CodeView>
      </NiceContain>
    );
  }
});

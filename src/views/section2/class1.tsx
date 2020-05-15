import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import WebGLContain from "@/components/WebGLContain";
import NiceContain from "@components/NiceContain";

const codeStr = `
const canvas = document.querySelector("el-webgl");
let gl = getWebGLContext(canvas);
if (!gl) {
  console.log("Faile to load");
}
// rgba
// 背景色在下一次调用gl.clearColor之前不会变
gl.clearColor(1, 0.5, 0.5, 3);
// 清空绘图区域实际上是清除颜色缓冲区 所以传入的是个COLOR_BUFFER_BIT
// gl.clear继承与OpenGL
gl.clear(gl!.COLOR_BUFFER_BIT);
`;

function handleCanvasReady(gl: WebGLRenderingContext) {
  gl.clearColor(1, 0.5, 0.5, 3);
  gl.clear(gl!.COLOR_BUFFER_BIT);
}

export default createComponent({
  setup() {
    return () => (
      <NiceContain>
        <WebGLContain onCanvasReady={handleCanvasReady}></WebGLContain>
        <CodeView code={codeStr}></CodeView>
      </NiceContain>
    );
  }
});

export { codeStr };

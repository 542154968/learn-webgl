import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import NiceContain from "@components/NiceContain";
import WebGLContain from "@/components/WebGLContain";
import { initShaders } from "@lib/cuon-utils";
import { codeStr as class1CodeStr } from "./Class1";

// 顶点着色器
const VSHADER_SOURCE = `
 void main(){
   // 设置坐标
   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
   // 设置尺寸
   gl_PointSize = 10.0;
 }
`;

// 片元着色器
const FSHADER_SOURCE = `
 void main(){
   // 设置颜色
   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
 }
`;

function handleCanvasReady(gl: WebGLRenderingContext) {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("failed to initialize shaders");
    return;
  }
  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}

const codeStr = `
// 顶点着色器
const VSHADER_SOURCE = \`${VSHADER_SOURCE}\`;
// 片元着色器
const FSHADER_SOURCE = \`${FSHADER_SOURCE}\`;
${class1CodeStr}
gl.drawArrays(gl.POINTS, 0, 1);
`;
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

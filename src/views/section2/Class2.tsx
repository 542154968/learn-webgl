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
   // vec4表示由4个浮点数组成的矢量
   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
   // 设置尺寸
   // float表示浮点数
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

// 代码片段
const codeStr = `
// 顶点着色器
// 描述定点特性（如位置、颜色等）的程序。顶点是指二维或三维空间的一个点，比如二维或三维图形的端点或交点。
const VSHADER_SOURCE = \`${VSHADER_SOURCE}\`;

// 片元着色器
// 进行逐片元处理过程，如光照的程序。片元是一个WebGL术语，你可以将其理解为像素（图像的单元）。
const FSHADER_SOURCE = \`${FSHADER_SOURCE}\`;
${class1CodeStr}
gl.drawArrays(gl.POINTS, 0, 1);

// 齐次坐标
// 齐次坐标可用符号描述 (x, y, z, w)。齐次坐标(x, y, z, w)等价于三维坐标(x / w, y / w, z / w)
// 如果齐次坐标第4个分量是1，你就可以将它当做三维坐标来使用
// 如果w无限趋近于0，那么它表示的点将趋近于无穷远，所以有无穷远的概念
// 三维图形在计算过程中，通常使用齐次坐标来表示顶点的三维坐标
`;

export function handleCanvasReady(
  gl: WebGLRenderingContext,
  VSHADER = VSHADER_SOURCE,
  FSHADER = FSHADER_SOURCE
) {
  if (!initShaders(gl, VSHADER, FSHADER)) {
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

export default createComponent({
  setup() {
    return () => (
      <NiceContain>
        <WebGLContain onCanvasReady={handleCanvasReady}></WebGLContain>
        <CodeView code={codeStr}></CodeView>
        <img src={require("@assets/images/2-2.jpg")} alt="2-2"></img>
      </NiceContain>
    );
  }
});

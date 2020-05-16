import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import NiceContain from "@components/NiceContain";
import WebGLContain from "@/components/WebGLContain";
import { handleCanvasReady } from "./Class2";

// 顶点着色器
const VSHADER_SOURCE = `
 void main(){
   // 设置坐标
   // vec4表示由4个浮点数组成的矢量
   gl_Position = vec4(0.0, 0.5, 0.0, 1.0);
   // 设置尺寸
   // float表示浮点数
   gl_PointSize = 10.0;
 }
`;

// 片元着色器
const FSHADER_SOURCE = `
void main(){
   // 设置颜色
   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
 }
`;

// 代码片段
const codeStr = `
// 顶点着色器
// 与第二节代码相比 我们修改了点的位置
const VSHADER_SOURCE = \`
  ${VSHADER_SOURCE}
\`;

// 片元着色器
// 与第二节代码相比，我们修改了颜色  rgba
const FSHADER_SOURCE = \`
  ${FSHADER_SOURCE}
\`;
`;

function handleWebglReady(gl: WebGLRenderingContext) {
  handleCanvasReady(gl, VSHADER_SOURCE, FSHADER_SOURCE);
}

export default createComponent({
  setup() {
    return () => (
      <NiceContain>
        <h1>右手坐标系</h1>
        <img src={require("@assets/images/2-3.jpg")} alt="2-2"></img>

        <h2>示例程序</h2>

        <WebGLContain onCanvasReady={handleWebglReady}></WebGLContain>

        <CodeView code={codeStr}></CodeView>
      </NiceContain>
    );
  }
});

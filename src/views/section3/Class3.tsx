import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import WebGLContain from "@/components/WebGLContain";
import NiceContain from "@components/NiceContain";
import { initShaders } from "@lib/cuon-utils";
import { FSHADER_SOURCE } from "../section2/Class4";

const VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform vec4 u_Translation;
void main(){
  // 顶点坐标 + 移动长度
  gl_Position = a_Position + u_Translation;
}
`;

const codeStr = `
// 定义各个轴方向上的移动距离
// 由于这三个长度单位对于所有顶点来说是固定的，所以我们使用uniform变量来表示三角形的平移距离
const Tx = 0.5;
const Ty = 0.5;
const Tz = 0.0;

// 顶点着色器
const VSHADER_SOURCE = \`
  ${VSHADER_SOURCE}
\`;

// 片元着色器
const FSHADER_SOURCE = \`
  ${FSHADER_SOURCE}
\`;

const canvas = document.querySelector("el-webgl");
let gl = getWebGLContext(canvas);
if (!gl) {
  console.log("Faile to load");
}

// 初始化着色器
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log("failed to initialize shaders");
  return;
}

const n = initVertexBuffers(gl);
if (n < 0) {
  console.log("Failed to set the position of the vertices");
  return;
}

// 移动的核心代码
// 将平移距离传输给顶点着色器
const u_Translation = gl.getUniformLocation(gl.program, "u_Translation");
gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);

// 设置canvas背景色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 清空canvas
gl.clear(gl.COLOR_BUFFER_BIT);
// 绘制一个三角形  和上节相比 就是改动这里
gl.drawArrays(gl.TRIANGLES, 0, n);

`;

const Tx = 0.5;
const Ty = 0.5;
const Tz = 0.0;
function handleCanvasReady(gl: WebGLRenderingContext) {
  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("failed to initialize shaders");
    return;
  }

  // 设置顶点位置
  const n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("Failed to set the position of the vertices");
    return;
  }

  // 将平移距离传输给顶点着色器
  const u_Translation = gl.getUniformLocation(gl.program, "u_Translation");

  gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制一个点
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl: WebGLRenderingContext): number {
  // 使用缓冲区对象
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // 将缓冲区对象绑定到目标
  // ARRAY_BUFFER 缓冲区对象包含了顶点的数据
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 向缓冲区对象中写入数据
  // 第二个参数中的数据写入了绑定到第一个参数gl.ARRAY_BUFFER上的缓冲区对象
  // 我们不能直接向缓冲区写入数据，只能向“目标”写入数据，所以要向缓冲区写入数据，必须先绑定
  // STATIC_DRAW 只向缓冲区写入一次数据 但需要绘制很多次
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 获取attribute变量的存储位置
  // gl.program是指定包含顶点着色器和片元着色器的着色器程序对象
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  // const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  // 设置颜色
  gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1);

  // 将顶点位置传输给attribute变量
  // gl.vertexAttrib1f(a_PointSize, 10.0);

  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // 连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
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

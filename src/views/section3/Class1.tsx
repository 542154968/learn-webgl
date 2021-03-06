import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import WebGLContain from "@/components/WebGLContain";
import NiceContain from "@components/NiceContain";
import { initShaders } from "@lib/cuon-utils";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "../section2/Class4";

const codeStr = `
// 构成三维模型的基本单位是三角形
// 不管三维模型多么复杂，其基本单位都是三角形

// 缓冲区对象可以一次性的向着色器传入多个顶点的数据
// 缓冲区对象是WebGL系统中的一块内存区域，我们可以一次性地向缓冲区对象中填充大量的顶点数据，然后将其保存在其中，供顶点着色器使用。


// 缓冲区对象
// gl.createBuffer(buffer)
// gl.deleteBuffer(buffer)

// 类型化数组
// 为了绘制三维图形，WebGL通常需要同时处理大量相同类型的数据。为了优化性能，WebGL为每种基本数据类型引入了一种特殊的数组（类型化数组）。
// 浏览器事先知道数组中的数据类型，所以处理起来也更加有效率。



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

// 设置canvas背景色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 清空canvas
gl.clear(gl.COLOR_BUFFER_BIT);
// 绘制一个点
gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl: WebGLRenderingContext): number {
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
const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

// 设置颜色
gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1);

// 将顶点位置传输给attribute变量
gl.vertexAttrib1f(a_PointSize, 10.0);

// 将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// 连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Position);

return n;
}
`;

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

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, n);
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
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  // 设置颜色
  gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1);

  // 将顶点位置传输给attribute变量
  gl.vertexAttrib1f(a_PointSize, 10.0);

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


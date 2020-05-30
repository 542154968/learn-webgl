import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import WebGLContain from "@/components/WebGLContain";
import NiceContain from "@components/NiceContain";
import { initShaders } from "@lib/cuon-utils";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "../section2/Class4";

const codeStr = `
// 相对于上一节代码 只需要改动这些 就可以绘制一个三角形了

// 绘制一个三角形
gl.drawArrays(gl.TRIANGLES, 0, n);
}

// 删除这两段代码  只有绘制点的时候才起作用
const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
gl.vertexAttrib1f(a_PointSize, 10.0);

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

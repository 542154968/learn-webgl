import { createComponent } from "@vue/composition-api";
import CodeView from "@components/CodeView";
import NiceContain from "@components/NiceContain";
import WebGLContain from "@/components/WebGLContain";
import { initShaders } from "@lib/cuon-utils";
import { codeStr as class1CodeStr } from "./Class1";

// 顶点着色器
const VSHADER_SOURCE = `
  // attribute 在这里成为存储限定符 它表示接下来的变量是一个attribute变量
  // attribute变量必须声明为全局变量
  // 数据将从着色器外部传给该变量
  // 变量声明格式 <存储限定符><类型><变量名>
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
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
// attribute变量传输的是那些与顶点相关的数据，它是一种GLSL ES变量，被用来从外部向顶点着色器内传输数据，只有顶点着色器能使用它。
//   1. 在顶点着色器中，声明attribute变量
//   2. 将attribute变量赋值给gl_Position变量
//   3. 向attribute变量传输数据


// uniform变量传输的是那些对于所有顶点都相同的数据


// 顶点着色器
const VSHADER_SOURCE = \`
  ${VSHADER_SOURCE}
\`;

// 片元着色器
const FSHADER_SOURCE = \`
  ${FSHADER_SOURCE}
\`;

${class1CodeStr}

// 初始化着色器
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log("failed to initialize shaders");
  return;
}

// 获取attribute变量的存储位置
// gl.program是指定包含顶点着色器和片元着色器的着色器程序对象
let a_Position = gl.getAttribLocation(gl.program, "a_Position");
let a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
if (a_Position < 0) {
  console.log("Failed to get the storage laoction of  a_Position");
  return;
}
if (a_PointSize < 0) {
  console.log("Failed to get the storage laoction of  a_PointSize");
  return;
}

// 将顶点位置传输给attribute变量
// 第一个参数是attribute变量的存储地址 后面对应x, y, z坐标值
// 第四个参数默认是1.0
gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
// gl.vertexAttrib 是方法 1是方法有几个参数 f是类型
gl.vertexAttrib1f(a_PointSize, 20.0);

// 设置canvas背景色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// 清空canvas
gl.clear(gl.COLOR_BUFFER_BIT);
// 绘制一个点
gl.drawArrays(gl.POINTS, 0, 1);


// 绑定点击事件 用来点击画点
canvas.onmousedown = function(evt) {
  handleClick(evt, gl, canvas, a_Position);
};

let g_points: number[] = [];
function handleClick(
  event: MouseEvent,
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  a_Position: number
) {
  let x = event.clientX;
  let y = event.clientY;
  let rect = canvas.getBoundingClientRect();
  // x-rect.left y-rect.top 就是canvas的xy屏幕坐标 就是在canvas中的坐标
  // canvas.height / 2 与 canvas.width / 2 计算出canvas的原点平移到中心点 与 WebGL的坐标系对应
  // 因为canvas的宽高都是400 x, y 轴的坐标区间所以都是[0, 400]
  // 而WebGL轴的坐标区间是[-1.0, 1.0] 
  // 所以将 x, y的坐标都除以对应的区间范围  就是相当于 x, y占坐标轴的百分之多少
  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
  // 为什么要记录这些点  
  // 因为WebGL的绘制操作是在颜色缓冲区中进行的，绘制结束缓冲区得内容显示在屏幕上，颜色缓冲区被重置
  g_points.push(x, y);

  // 清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  let len = g_points.length;
  // 每次取两个点(x, y)坐标 所以每次跳过前两个点
  for (let i = 0; i < len; i += 2) {
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
`;

function handleCanvasReady(gl: WebGLRenderingContext) {
  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("failed to initialize shaders");
    return;
  }

  // 获取attribute变量的存储位置
  // gl.program是指定包含顶点着色器和片元着色器的着色器程序对象
  let a_Position = gl.getAttribLocation(gl.program, "a_Position");
  let a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (a_Position < 0) {
    console.log("Failed to get the storage laoction of  a_Position");
    return;
  }
  if (a_PointSize < 0) {
    console.log("Failed to get the storage laoction of  a_PointSize");
    return;
  }
  // 将顶点位置传输给attribute变量
  // 第一个参数是attribute变量的存储地址 后面对应x, y, z坐标值
  // 第四个参数默认是1.0
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  // gl.vertexAttrib 是方法 1是方法有几个参数 f是类型
  gl.vertexAttrib1f(a_PointSize, 20.0);

  // 设置canvas背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);

  let canvas = document.querySelector("#webgl") as HTMLCanvasElement;
  canvas.onmousedown = function(evt) {
    handleClick(evt, gl, canvas, a_Position);
  };
}

let g_points: number[] = [];
function handleClick(
  event: MouseEvent,
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  a_Position: number
) {
  let x = event.clientX;
  let y = event.clientY;
  let rect = canvas.getBoundingClientRect();
  // x-rect.left y-rect.top 就是canvas的xy屏幕坐标 就是在canvas中的坐标
  // canvas.height / 2 与 canvas.width / 2 计算出canvas的原点平移到中心点 与 WebGL的坐标系对应
  // 因为canvas的宽高都是400 x, y 轴的坐标区间所以都是[0, 400]
  // 而WebGL轴的坐标区间是[-1.0, 1.0]
  // 所以将 x, y的坐标都除以对应的区间范围  就是相当于 x, y占坐标轴的百分之多少
  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
  // 为什么要记录这些点
  // 因为WebGL的绘制操作是在颜色缓冲区中进行的，绘制结束缓冲区得内容显示在屏幕上，颜色缓冲区被重置
  g_points.push(x, y);

  // 清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  let len = g_points.length;
  // 每次取两个点(x, y)坐标 所以每次跳过前两个点
  for (let i = 0; i < len; i += 2) {
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
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

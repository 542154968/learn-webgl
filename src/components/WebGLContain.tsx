import { createComponent, onMounted } from "@vue/composition-api";
import NiceContain from "@components/NiceContain";
import { getWebGLContext } from "@lib/cuon-utils";

export default createComponent({
  props: {
    onCanvasReady: {
      type: Function,
      require: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup(
    props: {
      onCanvasReady: (gl: WebGLRenderingContext | null) => {};
      width?: number;
      height?: number;
    },
    { refs, emit }
  ) {
    onMounted(() => {
      initCanvas();
    });

    function initCanvas() {
      const canvas: HTMLCanvasElement = refs["el-webgl"];
      let gl = getWebGLContext(canvas);
      if (!gl) {
        console.log("Faile to load");
      }
      emit("canvasReady", gl);
    }

    return () => (
      <NiceContain>
        <canvas
          id="webgl"
          ref="el-webgl"
          width={props.width}
          height={props.height}
        ></canvas>
      </NiceContain>
    );
  }
});

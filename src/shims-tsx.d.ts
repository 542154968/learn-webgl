import Vue, { VNode } from "vue";
import { ComponentRenderProxy } from "@vue/composition-api";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// 扩展composition-api 让其含有refs的对象声明
type RefsData = {
  [key: string]: any;
};
declare module "@vue/composition-api/dist/component/component" {
  interface SetupContext {
    refs: RefsData;
  }
}

// 全局扩展 WebGLRenderingContext 让其含有我们定义的program对象
declare global {
  interface WebGLRenderingContext {
    program: WebGLProgram;
  }
}

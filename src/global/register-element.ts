import { App } from "vue";
import "element-plus/dist/index.css";
import {
  ElProgress,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
} from "element-plus";

const components = [ElProgress, ElForm, ElFormItem, ElInput, ElButton];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}

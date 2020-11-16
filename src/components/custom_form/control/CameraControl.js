import Vue from "vue";
import cameraControl from "../components/cameraControl";

Vue.component("cameraControl",cameraControl);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("cameraControl", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Direction Control'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let cameraControlConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Direction Control',
  // 是否被渲染
  visibility: true
};

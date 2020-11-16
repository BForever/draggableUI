import Vue from "vue";
import cameraImage from "../components/cameraImage";

Vue.component("cameraImage",cameraImage);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("cameraImage", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Camera Image'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let cameraImageConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Video Stream',
  // 是否被渲染
  visibility: true
};

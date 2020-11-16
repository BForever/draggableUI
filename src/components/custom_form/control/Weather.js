import Vue from "vue";
import weather from "../components/weather";

Vue.component("weather",weather);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("weather", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Weather'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
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
  label: 'Weather',
  // 是否被渲染
  visibility: true
};

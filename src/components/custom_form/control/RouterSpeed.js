import Vue from "vue";
import routerSpeed from "../components/routerSpeed";

Vue.component("routerSpeed",routerSpeed);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("routerSpeed", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Router Speed'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let routerSpeedConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Router Speed',
  // 是否被渲染
  visibility: true
};

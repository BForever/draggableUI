import Vue from "vue";
import singleSwitch from "../components/singleSwitch";

Vue.component("singleSwitch",singleSwitch);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("singleSwitch", {
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

export let singleSwitchConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Single Switch',
  // 是否被渲染
  visibility: true
};

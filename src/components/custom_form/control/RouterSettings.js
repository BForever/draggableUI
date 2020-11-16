import Vue from "vue";
import routerSettings from "../components/routerSettings";

Vue.component("routerSettings",routerSettings);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("routerSettings", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Settings'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let routerSettingsConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Settings',
  // 是否被渲染
  visibility: true
};

import Vue from "vue";
import ovenControl from "../components/ovenControl";

Vue.component("ovenControl",ovenControl);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("ovenControl", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Power Control'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let ovenControlConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Power Control',
  // 是否被渲染
  visibility: true
};

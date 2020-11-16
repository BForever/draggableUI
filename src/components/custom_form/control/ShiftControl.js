
import Vue from "vue";
import shiftControl from "../components/shiftControl";
Vue.component("shiftControl",shiftControl);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("shiftControl", {
      attrs: {
      },
      props: {
        label:_self.obj.label,
        dict:_self.obj.dict?_self.obj.dict:null,
        props:_self.obj.props?_self.obj.props:null,

      },
      on: {
      }
    })
  ];
};

export let shiftControlConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Shift Control',
  // 是否被渲染
  visibility: true
};

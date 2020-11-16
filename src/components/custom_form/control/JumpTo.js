import Vue from "vue";
import jumpTo from "../components/jumpTo";

Vue.component("jumpTo",jumpTo);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("jumpTo", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Jump'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
        jumpTo:_self.obj.jumpTo,
      },
      on: {
      }
    })
  ];
};

export let jumpToConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Jump',

  jumpTo:"",
  // 是否被渲染
  visibility: true
};

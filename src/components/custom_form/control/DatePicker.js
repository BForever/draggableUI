import Vue from "vue";
import datePicker from "../components/datePicker";

Vue.component("datePicker",datePicker);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("datePicker", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Power Control'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
        jumpTo:_self.obj.jumpTo,
      },
      on: {
      }
    })
  ];
};

export let datePickerConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Calendar',

  // 是否被渲染
  visibility: true
};

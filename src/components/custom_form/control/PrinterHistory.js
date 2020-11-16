import printerHistory from "../components/printerHistory";
import Vue from "vue";

Vue.component("printerHistory",printerHistory);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("printerHistory", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Printer'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let printerHistoryConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Printer History',
  // 是否被渲染
  visibility: true
};

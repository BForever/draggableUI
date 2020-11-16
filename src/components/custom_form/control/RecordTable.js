import recordTable from "../components/recordTable";
import Vue from "vue";

Vue.component("recordTable",recordTable);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("recordTable", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Table'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let recordTableConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'State Record Table',
  // 是否被渲染
  visibility: true
};

import printerFile from "../components/printerFile";
import Vue from "vue";

Vue.component("printerFile",printerFile);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("printerFile", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Print File'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let printerFileConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Upload File',
  // 是否被渲染
  visibility: true
};

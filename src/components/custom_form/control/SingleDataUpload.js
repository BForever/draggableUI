import singleDataUpload from "../components/singleDataUpload";
import Vue from "vue";

Vue.component("singleDataUpload",singleDataUpload);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("singleDataUpload", {
      attrs: {
      },
      props: {
        label:(_self.obj.label==='Single Data Upload'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
      },
      on: {
      }
    })
  ];
};

export let singleDataUploadConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Single Data Upload',
  // 是否被渲染
  visibility: true
};

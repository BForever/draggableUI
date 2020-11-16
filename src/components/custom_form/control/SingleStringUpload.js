import singleStringUpload from "../components/singleStringUpload";
import Vue from "vue";

Vue.component("singleStringUpload",singleStringUpload);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("singleStringUpload", {
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

export let singleStringUploadConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Single State Upload',
  // 是否被渲染
  visibility: true
};

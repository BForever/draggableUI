import singleState from "../components/singleState";
import Vue from "vue";

Vue.component("singleState",singleState);

export default (_self, h) => {
  if(typeof _self.obj.dict ==="string"){
    _self.obj.dict = JSON.parse(_self.obj.dict)
  }
  return [
    h("singleState", {
      attrs: {
      },
      props: {
        // label:(_self.obj.label==='Single State Device'&&_self.obj.dict)?JSON.parse(_self.obj.dict).label:_self.obj.label,
        label:(_self.obj.label==='Single State Device'&&_self.obj.dict)?_self.obj.dict.label:_self.obj.label,
        // dict:_self.obj.dict?JSON.parse(_self.obj.dict):null,
      },
      on: {
        "on-change" (event) {
          if (!_self.obj.name) {
            return false;
          }
          console.log("test: onchange")
          _self.obj.value = event.currentTarget.value;
          _self.$emit('handleChangeVal', event.currentTarget.value)
        }
      }
    })
  ];
};

export let singleStateConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: 'Single State Device',
  // 是否被渲染
  visibility: true
}

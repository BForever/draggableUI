import xiaomiGateway from "../components/xiaomiGateway";
import Vue from "vue";

Vue.component("xiaomiGateway",xiaomiGateway);

export default (_self, h) => {
  return [
    h("xiaomiGateway", {
      attrs: {
        // type: "textarea",
        // placeholder: _self.obj.placeholder || "这是一个测试",
        // value: _self.obj.value,
        // maxlength: _self.obj.maxLength || 200
      },
      props: {
        rows: _self.obj.maxRows || 5
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

export let xiaomiConf = {
  // 对应数据库内类型
  type: 'textarea',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '小米网关',
  // 绑定的值
  value: "",
  // 表单name
  name: '',
  // 是否被渲染
  visibility: true
}

<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ this.objFormalName }}</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar md-elevation="0">
          <span class="md-title">UI Library</span>
        </md-toolbar>

        <md-content class="md-scrollbar" style="max-height: 800px;overflow: auto;background-color: #cccccc">
          <draggable :clone="cloneData" :list="form_list" :options="dragOptions1">
            <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
              <renders v-for="(element,index) in form_list" :key="index" :ele="element.ele"
                       :obj="element.obj || {}" :config-icon="false" style="margin: 5px"></renders>
            </transition-group>
          </draggable>
        </md-content>
      </md-app-drawer>

      <md-app-content style="display: flex">
        <div style="width: 1300px">
          <div class="md-layout">
            <div class="md-layout-item">
              <draggable :list="sortable_item1" :options="dragOptions2">
                <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
                  <renders @handleRemoveEle="removeEle1" @handleConfEle="confEle1"
                           @changeVisibility="changeVisibility1"
                           v-for="(element,index) in sortable_item1" :key="index" :index="index" :ele="element.ele"
                           :obj="element.obj || {}" :data="formData"
                           @handleChangeVal="val => handleChangeVal(val,element)" :sortableItem="sortable_item1"
                           :config-icon="true" style="margin-top: 20px">
                  </renders>
                </transition-group>
              </draggable>
            </div>
            <div class="md-layout-item md-size-33">
              <draggable :list="sortable_item2" :options="dragOptions3">
                <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
                  <renders @handleRemoveEle="removeEle2" @handleConfEle="confEle2"
                           @changeVisibility="changeVisibility2"
                           v-for="(element,index) in sortable_item2" :key="index" :index="index" :ele="element.ele"
                           :obj="element.obj || {}" :data="formData"
                           @handleChangeVal="val => handleChangeVal(val,element)" :sortableItem="sortable_item2"
                           :config-icon="true" style="margin-top: 20px" simplified=true>
                  </renders>
                </transition-group>
              </draggable>
            </div>
          </div>

          <div style="text-align: center">
            <md-button class="md-raised md-primary" @click="handleSubmit()">Submit</md-button>
            <md-button class="md-raised md-accent" @click="handleReset()" style="margin-left: 8px">Reset</md-button>
          </div>
        </div>

        <document></document>
      </md-app-content>
    </md-app>


    <!--      </i-col>-->
    <Modal v-model="showModal" :title="'配置' + modalFormData.modalTitle + '属性'" :mask-closable="false">
      <Form class="form_content" :label-width="80" :model="modalFormData" ref="modalFormData">
        <FormItem label="控件名称：" v-if="typeof modalFormData.label != 'undefined'">
          <i-input v-model="modalFormData.label" placeholder="请输入控件名称" :maxlength="20"></i-input>
        </FormItem>
        <FormItem label="关联设备：" v-if="showModal">
          <Select v-model="modalFormData.dict" filterable @on-change="handleDataDictChange">
            <!-- value绑定json字符串的原因是，需要用到parent_name，当handleDataDictChange触发，赋值到modalFormData -->
            <Option v-for="(item,index) in dataDictList" :value="JSON.stringify(item)" :key="index">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="关联属性：" v-if="showModal&&modalFormData.dict">
          <Select v-model="modalFormData.props" filterable @on-change="handleDataDictChange">
            <!-- value绑定json字符串的原因是，需要用到parent_name，当handleDataDictChange触发，赋值到modalFormData -->
            <Option v-for="(item,index) in JSON.parse(modalFormData.dict).props" :value="item" :key="index">{{ item }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="name属性：" v-if="typeof modalFormData.name != 'undefined'">
          <i-input v-model="modalFormData.name" placeholder="" disabled></i-input>
        </FormItem>
        <FormItem label="关联数据：" v-if="typeof modalFormData.relation != 'undefined'">
          <!-- 当绑定name并且当前relationList存在数据时候才可以关联字段 -->
          <Checkbox :disabled="!modalFormData.name || !relationList.length" v-model="modalFormData.relation">是否关联字段
          </Checkbox>
        </FormItem>
        <FormItem label="关联配置：" v-if="typeof modalFormData.relation != 'undefined' && modalFormData.relation">
          <Select v-model="modalFormData.relation_name" class="inline-block" style="width: 150px"
                  @on-change="_=>modalFormData.relation_value = ''">
            <Option :disabled="item.obj.name == modalFormData.name" v-for="(item,index) in relationList" :key="index"
                    :value="item.obj.name">{{ item.obj.label }}
            </Option>
          </Select>
          <p class="inline-block padder-sm">等于</p>
          <Select v-model="modalFormData.relation_value" class="inline-block" style="width: 150px">
            <Option v-for="(item,index) in relationValue" :key="index" :value="item.label_value">{{ item.label_name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
          <i-input v-model="modalFormData.placeholder" placeholder="请输入placeholder"></i-input>
        </FormItem>
        <FormItem label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'">
          <InputNumber v-model="modalFormData.maxLength" placeholder="请输入文本限制最大长度">
          </InputNumber>
        </FormItem>
        <FormItem label="最大限制：" v-if="typeof modalFormData.maxSize != 'undefined'">
          <InputNumber :formatter="value => `${value}kb`" :parser="value => value.replace('kb', '')"
                       v-model="modalFormData.maxSize" placeholder="请输入上传文件最大限制">
          </InputNumber>
        </FormItem>
        <FormItem label="上边距：" v-if="typeof modalFormData.marginTop != 'undefined'">
          <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')"
                       v-model="modalFormData.marginTop" placeholder="请输入标签上边距">
          </InputNumber>
        </FormItem>
        <FormItem label="下边距：" v-if="typeof modalFormData.marginBottom != 'undefined'">
          <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')"
                       v-model="modalFormData.marginBottom" placeholder="请输入标签下边距">
          </InputNumber>
        </FormItem>
        <FormItem label="左边距：" v-if="typeof modalFormData.marginLeft != 'undefined'">
          <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')"
                       v-model="modalFormData.marginLeft" placeholder="请输入标签左边距">
          </InputNumber>
        </FormItem>
        <FormItem label="最大值：" v-if="typeof modalFormData.maxValue != 'undefined'">
          <InputNumber v-model="modalFormData.maxValue" placeholder="请输入最大值">
          </InputNumber>
        </FormItem>
        <FormItem label="跳转页面：" v-if="typeof modalFormData.jumpTo != 'undefined'">
          <i-input v-model="modalFormData.jumpTo" placeholder="请输入跳转页面名">
          </i-input>
        </FormItem>
        <FormItem label="详细地址：" v-if="typeof modalFormData.details_address != 'undefined'">
          <Checkbox v-model="modalFormData.details_address">是否需要详细地址</Checkbox>
        </FormItem>
        <FormItem label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
          <Checkbox v-model="modalFormData.require">必填</Checkbox>
        </FormItem>
        <FormItem label="校验错误：" v-if="typeof modalFormData.ruleError != 'undefined'">
          <i-input v-model="modalFormData.ruleError" placeholder="请输入校验错误提示"></i-input>
        </FormItem>
        <FormItem label="是否多选："
                  v-if="typeof modalFormData.multiple != 'undefined' && modalFormData.type != 'address'">
          <Checkbox v-model="modalFormData.multiple">多选</Checkbox>
        </FormItem>
        <FormItem label="时间格式：" v-if="typeof modalFormData.format != 'undefined'">
          <RadioGroup v-model="modalFormData.format">
            <Radio label="yyyy年MM月dd日"></Radio>
            <Radio label="yyyy-MM-dd HH:mm"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="行内元素：" v-if="typeof modalFormData.inlineBlock != 'undefined'">
          <Checkbox v-model="modalFormData.inlineBlock">是</Checkbox>
        </FormItem>
        <FormItem label="显示行数：" v-if="typeof modalFormData.maxRows != 'undefined'">
          <Slider v-model="modalFormData.maxRows" :min="2" :max="10"></Slider>
        </FormItem>
        <FormItem label="标题大小：" v-if="typeof modalFormData.level != 'undefined'">
          <InputNumber :max="6" :min="1" v-model="modalFormData.level"></InputNumber>
        </FormItem>
        <FormItem label="字体颜色：" v-if="typeof modalFormData.color != 'undefined'">
          <ColorPicker v-model="modalFormData.color"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="modalFormData.loading" @click="handleOk">确定</Button>
      </div>
    </Modal>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Using Template?</md-dialog-title>
      <span style="margin-left: 30px;margin-right: 30px" class="md-body-2">We assume you are linking an existing device,<br>do you want to use existing template?</span>

      <md-dialog-actions>
        <md-button class="md-primary" @click="handleTemplate">Yes</md-button>
        <md-button class="md-primary" @click="showDialog = false">No</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>
<script>
import draggable from "vuedraggable";
import form_list from "./custom_form/FormList";
import document from "./custom_form/components/document";
import Document from "./custom_form/components/document";

export default {
  components: {
    Document,
    draggable
  },
  data() {
    return {
      form_list: form_list,
      sortable_item1: [],
      sortable_item2: [],
      showModal: false,
      showDialog: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新
      modalFormData: {
        color: '',
        loading: false
      },
      formData: {},
      dataDict: [],
      showNavigation: false,
      objName: null,
      userName: null,
    };
  },
  methods: {
    getQueryStringHash(key) {
      var after = window.location.href;
      if (after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空

      //key存在先通过search取值如果取不到就通过hash来取
      after = window.location.hash.split("?")[1];

      if (after) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        } else {
          return null;
        }
      }
    },
    handleTemplate() {
      if (this.objName.indexOf("air") !== -1&&this.objName.indexOf("jump") === -1) {
        this.sortable_item1 = [ {
          "obj" : {
            "listNum" : 1,
            "visibility" : true,
            "modalTitle" : "Single Switch",
            "listIndex" : 0,
            "dict" : {
              "label" : "air conditioner",
              "props" : [ "power", "mode", "temp", "direction", "shift" ]
            },
            "label" : "Power",
            "loading" : false,
            "config" : true,
            "props" : "power"
          },
          "ele" : "singleswitch"
        }, {
          "obj" : {
            "listNum" : 1,
            "visibility" : true,
            "modalTitle" : "Shift Control",
            "listIndex" : 1,
            "dict" : {
              "label" : "air conditioner",
              "props" : [ "power", "mode", "temp", "direction", "shift" ]
            },
            "label" : "Power Control",
            "loading" : false,
            "config" : true,
            "props" : "power"
          },
          "ele" : "shiftcontrol"
        }, {
          "obj" : {
            "listNum" : 1,
            "visibility" : true,
            "modalTitle" : "Shift Control",
            "listIndex" : 2,
            "dict" : {
              "label" : "air conditioner",
              "props" : [ "power", "mode", "temp", "direction", "shift" ]
            },
            "label" : "Mode",
            "loading" : false,
            "config" : true,
            "props" : "mode"
          },
          "ele" : "shiftcontrol"
        } ];
        this.sortable_item2 = [ {
          "obj" : {
            "listNum" : 2,
            "visibility" : true,
            "modalTitle" : "Single State Display",
            "listIndex" : 0,
            "dict" : {
              "label" : "temp sensor",
              "props" : [ "temperature" ]
            },
            "label" : "Current Temp",
            "loading" : false,
            "config" : true,
            "props" : "temperature"
          },
          "ele" : "singlestate"
        }, {
          "obj" : {
            "visibility" : true,
            "listIndex" : 1,
            "maxValue" : 30,
            "label" : "Target Temp",
            "type" : "textarea",
            "loading" : false,
            "props" : "temp",
            "listNum" : 2,
            "modalTitle" : "Slider",
            "name" : "",
            "dict" : "{\"label\":\"air conditioner\",\"props\":[\"power\",\"mode\",\"temp\",\"direction\",\"shift\"]}",
            "config" : true,
            "value" : ""
          },
          "ele" : "ledlightsmall"
        }, {
          "obj" : {
            "listNum" : 2,
            "visibility" : true,
            "modalTitle" : "Jump",
            "listIndex" : 3,
            "label" : "Jump",
            "jumpTo" : "air_jump",
            "loading" : false,
            "config" : true
          },
          "ele" : "jumpto"
        } ];
      }else if (this.objName.indexOf("air") !== -1&&this.objName.indexOf("jump") !== -1){
        this.sortable_item1 =[ {
          "ele" : "datepicker",
          "obj" : {
            "config" : true,
            "label" : "Calendar",
            "visibility" : true,
            "modalTitle" : "Calendar"
          }
        }, {
          "ele" : "singlestate",
          "obj" : {
            "config" : true,
            "label" : "Humidity",
            "visibility" : true,
            "modalTitle" : "Single State Display",
            "loading" : false,
            "listNum" : 1,
            "listIndex" : 0,
            "dict" : {
              "label" : "humidity sensor",
              "props" : [ "humidity" ]
            },
            "props" : "humidity"
          }
        } ];
          this.sortable_item2 =[ {
            "ele" : "singlestate",
            "obj" : {
              "config" : true,
              "label" : "Weather",
              "visibility" : true,
              "modalTitle" : "Single State Display",
              "loading" : false,
              "listNum" : 1,
              "listIndex" : 1,
              "dict" : {
                "label" : "weather",
                "props" : [ "sun", "temperature", "humidity", "weather" ]
              },
              "props" : "weather"
            }
          }, {
            "ele" : "jumpto",
            "obj" : {
              "config" : true,
              "label" : "Jump",
              "jumpTo" : "air",
              "visibility" : true,
              "modalTitle" : "Jump",
              "loading" : false,
              "listNum" : 2,
              "listIndex" : 0
            }
          } ];
      } else if (this.objName.indexOf("led") !== -1 || this.objName.indexOf("LED") !== -1 || this.objName.indexOf("Led") !== -1) {
        this.sortable_item1 = [{
          "ele": "singleswitch",
          "obj": {
            "config": true,
            "label": "Power",
            "visibility": true,
            "modalTitle": "Single Switch",
            "loading": false,
            "listNum": 1,
            "listIndex": 0,
            "dict": {
              "label": "light1",
              "props": ["power", "color", "bright", "illumination"]
            },
            "props": "power"
          }
        }, {
          "ele": "ledlightsmall",
          "obj": {
            "type": "textarea",
            "config": true,
            "label": "Brightness",
            "maxValue": 10,
            "value": "",
            "name": "",
            "visibility": true,
            "modalTitle": "Slider",
            "loading": false,
            "listNum": 1,
            "listIndex": 1,
            "dict": "{\"label\":\"light1\",\"props\":[\"power\",\"color\",\"bright\",\"illumination\"]}",
            "props": "bright"
          }
        }];
        this.sortable_item2 = [{
          "ele": "ledlightlarge",
          "obj": {
            "type": "textarea",
            "config": true,
            "label": "Color Control",
            "value": "",
            "name": "",
            "visibility": true,
            "modalTitle": "LED Control",
            "loading": false,
            "listNum": 2,
            "listIndex": 0,
            "dict": "{\"label\":\"light1\",\"props\":[\"power\",\"color\",\"bright\",\"illumination\"]}",
            "props": "color"
          }
        }, {
          "ele": "singlestate",
          "obj": {
            "config": true,
            "label": "Illumination",
            "visibility": true,
            "modalTitle": "Single State Display",
            "loading": false,
            "listNum": 2,
            "listIndex": 1,
            "dict": {
              "label": "light1",
              "props": ["power", "color", "bright", "illumination"]
            },
            "props": "illumination"
          }
        }];
      }

      this.showDialog = false;
    },
    // 克隆表单提交事件
    handleSubmit() {

      let form = {
        form1: this.sortable_item1,
        form2: this.sortable_item2,
      };
      this.$http.put('layout/' + this.objName + '_' + this.userName, form).then(res => {
        this.$router.push('/?obj=' + this.objName + '&user=' + this.userName);
      }).catch(err => {
        console.log(err)
      })
      // localStorage.setItem('template_form1_'+this.objName, JSON.stringify(this.sortable_item1));
      // localStorage.setItem('template_form2_'+this.objName, JSON.stringify(this.sortable_item2));

    },
    // 清空克隆表单
    handleReset() {
      this.sortable_item1 = [{ele: "title", obj: {config: true, label: "place your UI here", marginLeft: 20}}];
      this.sortable_item2 = [{ele: "title", obj: {config: true, label: "place your UI here", marginLeft: 20}}];
      if (this.objName.indexOf("air") !== -1||this.objName.indexOf("led") !== -1 || this.objName.indexOf("LED") !== -1 || this.objName.indexOf("Led") !== -1){
        this.showDialog=true;
      }
    },
    // modal内数据字典选项发生改变触发事件
    handleDataDictChange(val) {
      // 选中后，val默认赋值到modalFormData.dict
      const obj = JSON.parse(val);
      // 数据加载中，禁止modal_submit提交按钮
      // this.$set(this.modalFormData, 'loading', true);
      // this.$http.get(`/static/label.${obj.id}.json`).then(d => {
      //   this.modalFormData = Object.assign({}, this.modalFormData, {
      //     name: d.data.name,
      //     loading: false,
      //     items: d.data.items,
      //     parent_name: obj.parent_name
      //   });
      // });
    },

    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label || "";
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // modal点击确定执行事件
    handleOk() {
      const index = this.modalFormData.listIndex;
      if (this.modalFormData.listNum === 1) {
        this.sortable_item1[index].obj = Object.assign({},
          this.sortable_item1[index].obj,
          this.modalFormData
        );
        this.sortable_item1[index].obj.dict = this.modalFormData.dict
      } else {
        this.sortable_item2[index].obj = Object.assign({},
          this.sortable_item2[index].obj,
          this.modalFormData
        );
        this.sortable_item2[index].obj.dict = this.modalFormData.dict
      }
      this.handleCancel();
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false;
      setTimeout(_ => {
        this.modalFormData = {
          color: '',
          loading: false
        };
      }, 500)
    },
    // 显示modal,配置被克隆控件
    confEle1(index) {
      const list_temp = Object.assign({}, this.sortable_item1[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      if (this.modalFormData.hasOwnProperty("dict")) {
        this.modalFormData.dict = JSON.stringify(this.modalFormData.dict)
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listNum = 1;
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    confEle2(index) {
      const list_temp = Object.assign({}, this.sortable_item2[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      if (this.modalFormData.hasOwnProperty("dict")) {
        this.modalFormData.dict = JSON.stringify(this.modalFormData.dict)
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listNum = 2;
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle1(index) {
      let name = this.sortable_item1[index].obj.name;
      this.sortable_item1.splice(index, 1);
      if (!name) return;
      for (let i in this.sortable_item1) {
        // 当relation为true并且关联字段被确认
        if (this.sortable_item1[i].obj.relation && this.sortable_item1[i].obj.relation_name === name) {
          this.$set(this.sortable_item1[i].obj, "relation", false);
          this.$set(this.sortable_item1[i].obj, "relation_name", "");
          this.$set(this.sortable_item1[i].obj, "relation_value", "");
          break;
        }
      }
    },
    removeEle2(index) {
      let name = this.sortable_item2[index].obj.name;
      this.sortable_item2.splice(index, 1);
      if (!name) return;
      for (let i in this.sortable_item2) {
        // 当relation为true并且关联字段被确认
        if (this.sortable_item2[i].obj.relation && this.sortable_item2[i].obj.relation_name === name) {
          this.$set(this.sortable_item2[i].obj, "relation", false);
          this.$set(this.sortable_item2[i].obj, "relation_name", "");
          this.$set(this.sortable_item2[i].obj, "relation_value", "");
          break;
        }
      }
    },
    // 更改当前渲染字段是否显示
    changeVisibility1(index, visibility) {
      this.$set(this.sortable_item1[index].obj, 'visibility', visibility);
    },
    changeVisibility2(index, visibility) {
      this.$set(this.sortable_item2[index].obj, 'visibility', visibility);
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.handleCancel();
      }
    }
  },
  computed: {
    objFormalName() {
      return this.objName.replace(/_/g, " ");
    },
    // 数据字典已选择项
    dataDictSelected() {
      return this.sortable_item1.map(v => {
        const obj = JSON.parse(v.obj.dict || '{}');
        return obj.id || -1;
      })
    },
    // 对应控件的数据字典
    dataDictList() {
      return this.dataDict;
      // return this.dataDict.filter(v => {
      //   return v.type == this.modalFormData.type;
      // })
    },
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 500,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false,
        forceFallback: false
      };
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 500,
        ghostClass: "ghost",
        group: {
          name: "shared",
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        },
        forceFallback: false,
      };
    },
    dragOptions3() {
      return {
        animation: 500,
        ghostClass: "ghost",
        group: {
          name: "shared",
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        }
      };
    },
    // 被关联字段列表
    // relationList() {
    //   // 只有type内三项可作为被关联字段
    //   let type = ['select', 'radio', 'checkbox'];
    //   const arr = this.sortable_item1.filter(k => {
    //     return type.indexOf(k.ele) >= 0 && !!k.obj.name;
    //   })
    //   return arr;
    // },
    // // 被关联字段数据
    // relationValue() {
    //   const name = this.modalFormData.relation_name;
    //   let items = [];
    //   if (!name) return items;
    //   for (let i in this.sortable_item1) {
    //     if (this.sortable_item1[i].obj.name == name) {
    //       items = this.sortable_item1[i].obj.items;
    //     }
    //   }
    //   return items;
    // }
  },
  created() {

    // /static/label.json
    // this.$http.get('/object').then(d => {
    //   this.dataDict = d.data;
    // });
    this.dataDict = [
      {label: "oven", props: ["power", "mode", "temp"]},
      {label: "camera", props: ["power", "direction"]},
      {label: "light1", props: ["power", "color", "bright", "illumination"]},
      {label: "light2", props: ["power", "bright", "illumination"]},
      {label: "humidity sensor", props: ["humidity"]},
      {label: "temp sensor", props: ["temperature"]},
      {label: "weather", props: ["sun", "temperature", "humidity", "weather"]},
      {label: "printer", props: ["power", "file"]},
      {label: "fan", props: ["power", "mode", "direction", "shift"]},
      {label: "router", props: ["power", "upload_speed", "download_speed", "user_list"]},
      {label: "air conditioner", props: ["power", "mode", "temp", "direction", "shift"]},
    ]

    this.objName = this.getQueryStringHash("obj");
    this.userName = this.getQueryStringHash("user");


    this.$http.get('/layout/' + this.objName + '_' + this.userName).then(d => {
      this.sortable_item1 = d.data.form1;
      this.sortable_item2 = d.data.form2;
    }).catch(err => {
      this.sortable_item1 = [{ele: "title", obj: {config: true, label: "place your UI here", marginLeft: 20}}];
      this.sortable_item2 = [{ele: "title", obj: {config: true, label: "place your UI here", marginLeft: 20}}];
      if (this.objName.indexOf("air") !== -1||this.objName.indexOf("led") !== -1 || this.objName.indexOf("LED") !== -1 || this.objName.indexOf("Led") !== -1){
        this.showDialog=true;
      }
    });



    // if(this.objName==="air"&&localStorage.getItem('template_form1_'+this.objName)==null){
    //   this.sortable_item1 = JSON.parse("[{\"ele\":\"datepicker\",\"obj\":{\"config\":true,\"label\":\"Date\",\"visibility\":true,\"modalTitle\":\"Date\"}},{\"ele\":\"singlestate\",\"obj\":{\"config\":true,\"label\":\"Current Weather\",\"visibility\":true,\"modalTitle\":\"Single State Device\",\"loading\":false,\"listNum\":1,\"listIndex\":2}},{\"ele\":\"ledlightsmall\",\"obj\":{\"type\":\"textarea\",\"config\":true,\"label\":\"TargetTemp\",\"maxValue\":30,\"value\":\"\",\"name\":\"\",\"visibility\":true,\"modalTitle\":\"Value\",\"loading\":false,\"listNum\":1,\"listIndex\":1}},{\"ele\":\"ovencontrol\",\"obj\":{\"config\":true,\"label\":\"Power Control\",\"visibility\":true,\"modalTitle\":\"Power Control\"}}]")
    //   this.sortable_item2 = JSON.parse("[{\"ele\":\"singlestate\",\"obj\":{\"config\":true,\"label\":\"Current Temp\",\"visibility\":true,\"modalTitle\":\"Single State Device\",\"loading\":false,\"listNum\":1,\"listIndex\":0}},{\"ele\":\"singlestate\",\"obj\":{\"config\":true,\"label\":\"Humidity\",\"visibility\":true,\"modalTitle\":\"Single State Device\",\"loading\":false,\"listNum\":2,\"listIndex\":0}},{\"ele\":\"jumpto\",\"obj\":{\"config\":true,\"label\":\"Detailed Settings\",\"jumpTo\":\"camera\",\"visibility\":true,\"modalTitle\":\"Detailed Settings\",\"loading\":false,\"listNum\":2,\"listIndex\":2}}]")
    // }else {
    //   this.sortable_item1 = JSON.parse(localStorage.getItem('template_form1_'+this.objName) || '[{"ele":"title","obj":{"config":true,"label":"place your UI here","marginLeft":20}}]');
    //   this.sortable_item2 = JSON.parse(localStorage.getItem('template_form2_'+this.objName) || '[{"ele":"title","obj":{"config":true,"label":"place your UI here","marginLeft":20}}]');
    //
    // }

  }
};
</script>
<style>
.items .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

.items:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}


</style>

<template>
  <!--  <Form ref="formValidate" class="b-a" :label-width="100" :model="formData" @submit.native.prevent>-->
  <!--    <p>未绑定数据字典控件无效</p>-->

  <md-card>
    <md-card-header>
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="md-title">{{this.objFormalName}}</div>
        </div>
        <div class="md-layout-item md-size-10">
          <md-switch v-model="lock"></md-switch>
        </div>
      </div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item">
          <div v-if="lock">
            <renders v-for="(element,index) in template_form1" :key="index" :index="index" :ele="element.ele"
                     :obj="element.obj || {}" @handleChangeVal="val => handleChangeVal(val,element)"
                     @changeVisibility="changeVisibility" :value="formData[element.obj.name]"
                     :sortableItem="template_form1" style="margin-bottom: 2px;margin-right: 2px">
            </renders>
          </div>
          <draggable v-else :list="template_form1" :options="dragOptions">
            <renders v-for="(element,index) in template_form1" :key="index" :index="index" :ele="element.ele"
                     :obj="element.obj || {}" @handleChangeVal="val => handleChangeVal(val,element)"
                     @changeVisibility="changeVisibility" :value="formData[element.obj.name]"
                     :sortableItem="template_form1" style="margin-bottom: 2px;margin-right: 2px">
            </renders>
          </draggable>


        </div>
        <div class="md-layout-item md-size-25">
          <div v-if="lock">
            <renders v-for="(element,index) in template_form2" :key="index" :index="index" :ele="element.ele"
                     :obj="element.obj || {}" @handleChangeVal="val => handleChangeVal(val,element)"
                     @changeVisibility="changeVisibility" :value="formData[element.obj.name]"
                     :sortableItem="template_form2" style="margin-bottom: 2px" simplified=true>
            </renders>
          </div>
          <draggable v-else :list="template_form2" :options="dragOptions">
            <renders v-for="(element,index) in template_form2" :key="index" :index="index" :ele="element.ele"
                     :obj="element.obj || {}" @handleChangeVal="val => handleChangeVal(val,element)"
                     @changeVisibility="changeVisibility" :value="formData[element.obj.name]"
                     :sortableItem="template_form2" style="margin-bottom: 2px" simplified=true>
            </renders>
          </draggable>

        </div>
      </div>
    </md-card-content>
    <div style="text-align: center">
      <md-button class="md-raised md-primary" @click="this.routeToIndex">configure</md-button>
    </div>


  </md-card>

  <!--    <FormItem>-->
  <!--      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>-->
  <!--      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
  <!--    </FormItem>-->
  <!--  </Form>-->
</template>
<script>
  import draggable from "vuedraggable";

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        template_form1: [],
        template_form2: [],
        formData: {},
        lock: true,
        objName:null,
        userName:null,
      }
    },
    watch: {
      template_form1(val) {
        this.saveLayout();
      },
      template_form2(val) {
        this.saveLayout();
      }
    },
    computed: {
      objFormalName(){
        return this.objName.replace(/_/g," ")
      },
      dragOptions() {
        return {
          forceFallback: false,
          group: {
            name: "components",
            put: ["components"]
          }
        }
      }
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
      saveLayout() {
        let form = {
          form1:this.template_form1,
          form2:this.template_form2,
        };
        this.$http.put('layout/'+this.objName,form);
      }
      ,
      routeToIndex() {
        this.$router.replace('/?obj='+this.objName)
      }
      ,
      // 控件回填数据
      handleChangeVal(val, element) {
        this.$set(this.formData, element.obj.name, val);
        // this.formData[element.obj.name] = val;
      }
      ,
      // 更改当前渲染字段是否显示
      changeVisibility(index, visibility) {
        this.$set(this.template_form1[index].obj, 'visibility', visibility);
      }
    }
    ,
    created() {
      this.objName = this.getQueryStringHash("obj");
      this.userName = this.getQueryStringHash("user");
      this.$http.get('/layout/'+this.objName+'_'+this.userName).then(d => {
        this.template_form1 = d.data.form1;
        this.template_form2 = d.data.form2;
      }).catch(err=>{
        this.template_form1 = [];
        this.template_form2 = [];
      });

      // this.$http.get('/static/template_form2').then(d => {
      //   this.template_form2 = d.data;
      // });
      // this.template_form1 = JSON.parse(localStorage.getItem('template_form1') || '[]');
      // this.template_form2 = JSON.parse(localStorage.getItem('template_form2') || '[]');
      for (let i in this.template_form1) {
        this.$set(this.formData, this.template_form1[i].obj.name, this.template_form1[i].obj.value);
      }
      for (let i in this.template_form2) {
        this.$set(this.formData, this.template_form2[i].obj.name, this.template_form2[i].obj.value);
      }
    }
  }

</script>
<style>


</style>

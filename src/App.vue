<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true                    //控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  }
}

</script>
<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  !*color: #2c3e50;*!*/
/*  !*margin-top: 60px;*!*/
/*}*/

/*.container {*/
/*  padding-right: 15px;*/
/*  padding-left: 15px;*/
/*  margin-right: auto;*/
/*  margin-left: auto;*/
/*}*/

/*.ivu-col-span-12 {*/
/*  display: block;*/
/*  padding-left: 15px;*/
/*  padding-right: 15px;*/
/*  width: 50%;*/
/*}*/

</style>

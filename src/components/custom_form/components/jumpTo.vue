<template>
  <div>
    <md-card>
      <md-card-content >
        <md-button class="md-raised md-primary" @click="jump">{{ this.label }}</md-button>
      </md-card-content>
    </md-card>

  </div>
</template>

<script>
export default {
  name: "jumpTo",
  props: {
    label: "",
    jumpTo:"",

  },
  inject:['reload'],
  data() {
    return {
      userName:null,
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
    jump(){
      this.$router.replace('/?obj='+this.jumpTo+'&user='+this.userName)
      this.reload()
    }
  },
  created() {
    this.userName = this.getQueryStringHash('user')
  }
  ,
}
</script>

<style scoped>

caption {

  font-size: larger;

  margin: 1em auto;

}

</style>

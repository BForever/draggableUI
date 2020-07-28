<template>
  <md-card >
    <md-subheader>
      {{this.label}}
    </md-subheader>
    <md-card-content style="text-align: center">
<!--      <input-number v-model="value"></input-number>-->
      <md-field>
        <label>Number</label>
        <md-input v-model="value" type="number"></md-input>
      </md-field>
      <md-button @click="submit">submit</md-button>
    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: "singleDataUpload",
    props: {
      label: "",
      dict: null,
    },
    inject:['reload'],
    data() {
      return {
        value:null,
      }
    },
    watch: {},
    computed: {
    },
    methods: {
      submit:function () {
        if (this.label!=="Single Data Upload") {
          let label = this.label
          let label_str = label.replace(/\s*/g, "");
          let now = new Date();
          let month = 1+now.getMonth();
          let time = now.getFullYear()+"-"+month+"-"+ now.getDate()+" "+ now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
          let record = {
            name:label_str,
            time:time,
            value:this.value,
            user:"UI",
          };
          this.$http.put("/data/" + label_str,record).then(res => {
            console.log(res.data);
            this.reload()
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }

    },
    created: function () {

    }
  }
</script>

<style scoped>
  button {
    margin: 0 auto;
  }
</style>

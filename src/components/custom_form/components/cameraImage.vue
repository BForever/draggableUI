<template>
  <div>
    <md-card>
      <md-subheader>{{ this.label }}</md-subheader>


      <md-card-content >
        <img src="http://www.jsdcctv168.com/uploadfile/2018/0918/20180918110948_60265.jpg">

      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "cameraImage",
  props: {
    label: "",
  },
  data() {
    return {
      upload:0,
      download:0,
    }
  },
  created() {
  }
  ,
  methods: {}
}
</script>

<style scoped>

caption {

  font-size: larger;

  margin: 1em auto;

}

</style>

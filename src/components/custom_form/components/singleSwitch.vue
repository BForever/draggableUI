<template>
  <div>
    <md-card>
      <div class="md-layout">
        <div class="md-layout-item">
          <md-subheader style="float: left">
            {{this.label}}
          </md-subheader>
        </div>

        <div class="md-layout-item md-size-25">
          <md-switch v-model="state" style="float: right"></md-switch>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "singleSwitch",
  props: {
    label: "",
  },
  data() {
    return {
      state:null,
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

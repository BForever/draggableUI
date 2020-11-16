<template>
  <div>
    <md-card>
      <md-card-header>{{ this.label }}</md-card-header>


      <md-card-content >
        <md-icon>wifi</md-icon>

        <span class="md-body-2">Up: {{upload}} KB/s</span>
        <span class="md-body-2">Down: {{download}} KB/s</span>
      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "routerSpeed",
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

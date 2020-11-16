<template>
  <div>
    <md-card>
      <md-card-header>{{ this.label }}</md-card-header>


      <md-card-content >

        <md-button class="md-raised md-primary">Mode 1</md-button>
        <md-button class="md-raised md-primary">Mode 2</md-button>
        <md-button class="md-raised md-primary">Mode 3</md-button>
      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "ovenMode",
  props: {
    label: "",
  },
  data() {
    return {
      fanSwitch:false,
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

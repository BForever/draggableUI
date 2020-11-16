<template>
  <div>
    <md-card>
      <md-card-header>{{ this.label }}</md-card-header>


      <md-card-content >

        <md-button class="md-raised md-primary"><md-icon>skip_next</md-icon>start/pause</md-button>
        <md-button class="md-raised md-primary"><md-icon>settings_power</md-icon>power save</md-button>
        <md-button class="md-raised md-primary"><md-icon>power_settings_new</md-icon>on/off</md-button>
      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "ovenControl",
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

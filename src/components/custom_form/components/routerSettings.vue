<template>
  <div>
    <md-card>
      <md-card-header>{{ this.label }}</md-card-header>


      <md-card-content >
        <md-button class="md-raised md-primary"><md-icon>cached</md-icon>reset</md-button>
        <md-button class="md-raised md-primary"><md-icon>settings</md-icon>settings</md-button>
        <md-button class="md-raised md-primary"><md-icon>lock</md-icon>password</md-button>
      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "routerSettings",
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

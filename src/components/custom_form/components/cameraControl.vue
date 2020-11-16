<template>
  <div>
    <md-card>
      <md-subheader>{{ this.label }}</md-subheader>
      <md-card-content style="text-align: center">
        <md-button class="md-icon-button md-raised md-primary"><md-icon>keyboard_arrow_up</md-icon></md-button>
        <div>
          <md-button style="margin-right: 30px" class="md-icon-button md-raised md-primary"><md-icon>keyboard_arrow_left</md-icon></md-button>
          <md-button class="md-icon-button md-raised md-primary"><md-icon>keyboard_arrow_right</md-icon></md-button>
        </div>
        <md-button class="md-icon-button md-raised md-primary"><md-icon>keyboard_arrow_down</md-icon></md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "cameraControl",
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

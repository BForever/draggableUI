<template>
  <div>
    <md-card>
      <md-subheader>
        {{ this.label }}
      </md-subheader>

      <md-card-content v-if="airPower">
        <md-tabs>
          <md-tab id="tab-home" md-label="on/off"></md-tab>
          <md-tab id="tab-pages" md-label="sleep"></md-tab>
          <md-tab id="tab-posts" md-label="pause/unpause"></md-tab>
        </md-tabs>
      </md-card-content>
      <md-card-content v-else-if="airMode">
        <md-tabs>
          <md-tab id="tab-home" md-label="cool"></md-tab>
          <md-tab id="tab-pages" md-label="dry"></md-tab>
          <md-tab id="tab-posts" md-label="heat"></md-tab>
        </md-tabs>
      </md-card-content>
      <md-card-content v-else>
        <md-tabs>
          <md-tab id="tab-home" md-label="1"></md-tab>
          <md-tab id="tab-pages" md-label="2"></md-tab>
          <md-tab id="tab-posts" md-label="3"></md-tab>
          <md-tab id="tab-favorites" md-label="4"></md-tab>
        </md-tabs>
      </md-card-content>


    </md-card>

  </div>
</template>

<script>
export default {
  name: "shiftControl",
  props: {
    label: "",
    dict: null,
    props: null
  },
  data() {
    return {}
  },
  created() {
  }
  ,
  methods: {},
  computed: {
    airPower() {
      return this.dict?this.dict.label === 'air conditioner' && this.props === 'power':false;
    },
    airMode() {
      return this.dict?this.dict.label === 'air conditioner' && this.props === 'mode':false;
    }
  }
}
</script>

<style scoped>

caption {

  font-size: larger;

  margin: 1em auto;

}

</style>

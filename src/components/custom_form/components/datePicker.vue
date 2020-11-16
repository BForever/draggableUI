<template>
  <div>
    <md-card>
      <md-subheader>
        {{this.label}}
      </md-subheader>
      <md-card-content >
        <md-datepicker v-model="selectedDate" :md-open-on-focus="false" />
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
      selectedDate:null,
    }
  },
  created() {
  }
  ,
  methods: {

  }
}
</script>

<style scoped>

caption {

  font-size: larger;

  margin: 1em auto;

}

</style>

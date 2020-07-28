<template>
  <div>
    <md-card class="md-scrollbar">
        <md-table >
          <md-table-toolbar>
            <md-subheader>{{this.label}}</md-subheader>
          </md-table-toolbar>
          <md-table-row>
            <md-table-head md-numeric>id</md-table-head>
            <md-table-head>time</md-table-head>
            <md-table-head>value</md-table-head>
            <md-table-head>user</md-table-head>
          </md-table-row>
          <md-table-row v-for="record in records">
            <md-table-cell md-numeric>{{record.id}}</md-table-cell>
            <md-table-cell>{{record.time.getMonth()+1}}-{{record.time.getDate()}}
              {{record.time.getHours()}}:{{record.time.getMinutes()}}:{{record.time.getSeconds()}}
            </md-table-cell>
            <md-table-cell>{{record.value}}</md-table-cell>
            <md-table-cell>{{record.user}}</md-table-cell>
          </md-table-row>
        </md-table>
    </md-card>


    <!--    <table>-->
    <!--      <tr>-->
    <!--        <th>编号</th>-->
    <!--        <th>时间</th>-->
    <!--        <th>value</th>-->
    <!--        <th>用户</th>-->
    <!--      </tr>-->
    <!--      <tr v-for="record in records">-->
    <!--        <td>{{record.id}}</td>-->
    <!--        <td>{{record.time.getFullYear()}}-{{record.time.getMonth()+1}}-{{record.time.getDate()}}-->
    <!--          {{record.time.getHours()}}:{{record.time.getMinutes()}}:{{record.time.getSeconds()}}-->
    <!--        </td>-->
    <!--        <td>{{record.value}}</td>-->
    <!--        <td>{{record.user}}</td>-->
    <!--      </tr>-->
    <!--    </table>-->
  </div>
</template>

<script>
  export default {
    name: "recordTable",
    props: {
      label: "",
    },
    data() {
      return {
        records: [
          {
            id: 1,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
          {
            id: 2,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
          {
            id:3,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
          {
            id: 4,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
          {
            id: 5,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
          {
            id: 6,
            time: new Date(),
            value: "uninited",
            user: "fhc"
          },
        ],
      }
    },
    created() {
      if (this.label!=="Table") {
        let label = this.label;
        let label_str = label.replace(/\s*/g, "");
        this.$http.get("/data/" + label_str).then(res => {
          res.data.reverse();
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].time = new Date(res.data[i].time)
            this.$set(this.records, i, res.data[i])
          }

          // this.records = res.data;
        })
      }
    }
    ,
    methods: {}
  }
</script>

<style scoped>

  .md-card {
    /*max-width: 349px;*/
    max-height: 200px;
    overflow: auto;
  }
  /*table {*/

  /*  border-collapse: collapse;*/

  /*  font-family: Futura, Arial, sans-serif;*/

  /*}*/

  caption {

    font-size: larger;

    margin: 1em auto;

  }

  /*th, td {*/

  /*  padding: .65em;*/

  /*}*/

  /*th {*/

  /*  background: #3895fe;*/

  /*  border: 1px solid #dddee1;*/

  /*  color: #ffffff;*/

  /*}*/

  /*td {*/

  /*  border: 1px solid #dddee1;*/

  /*}*/

  /*tbody tr:nth-child(odd) {*/

  /*  background: #ccc;*/

  /*}*/
</style>

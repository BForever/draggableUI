<template>
  <div>
    <md-card>
      <md-card-header>
        <div >{{this.label}}</div>
      </md-card-header>

      <md-card-content>
        <md-table v-model="records"  @md-selected="onSelect">
          <md-table-row slot="md-table-row" slot-scope="{ item }"  md-selectable="single">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{item.id}}</md-table-cell>
            <md-table-cell md-label="Time" >{{item.time.getMonth()+1}}-{{item.time.getDate()}}
              {{item.time.getHours()}}:{{item.time.getMinutes()}}:{{item.time.getSeconds()}}
            </md-table-cell>
            <md-table-cell md-label="File" >{{item.value}}</md-table-cell>
            <md-table-cell md-label="User" >{{item.user}}</md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>

      <md-card-actions>
        <md-button>Print</md-button>
      </md-card-actions>
    </md-card>

  </div>
</template>

<script>
  export default {
    name: "printerHistory",
    props: {
      label: "",
    },
    data() {
      return {
        selected:{},
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
      if (this.label!=="Printer") {
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
    methods: {
      onSelect(item){
        this.selected = item;
      }
    }
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

<template>
  <div>
    <md-card>
      <md-subheader>
        <div>{{this.label}}</div>
      </md-subheader>

      <md-card-content >
        <md-field>
          <label>Select file to print</label>
          <md-file v-model="uploadFile" />
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button>Upload</md-button>
      </md-card-actions>
    </md-card>

  </div>
</template>

<script>
  export default {
    name: "printerFile",
    props: {
      label: "",
    },
    data() {
      return {
        uploadFile: null,
        uploadFileName:"No file selected.",
      }
    },
    created() {
    }
    ,
    methods: {
      onSelect(item){
        this.selected = item;
      },
      getFile(event) {
        var file = event.target.files;
        var imgName = file[0].name;
        var idx = imgName.lastIndexOf(".");
        if (idx != -1) {
          var ext = imgName.substr(idx + 1).toUpperCase();
          ext = ext.toLowerCase();
          if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
            console.log("please upload files of image type!")
          } else {
            this.uploadFile = file[0];
            this.uploadFileName = file[0].name;
          }
        } else {
          console.log("please upload files of image type!")
        }
      },
    }
  }
</script>

<style scoped>

  .md-card {
    /*max-width: 349px;*/
    max-height: 200px;
    overflow: auto;
  }

  .filename{
    margin-top: 5px;
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

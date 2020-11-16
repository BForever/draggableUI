<template>
  <div class="back">
    <input type="file" ref="inputFile" @change="getFile($event)" multiple="multiplt" class="add-file-right-input"
           style="margin-left:70px;" accept=".png,.jpg,.jpeg">
    <Button @click="this.$refs.inputFile.click()">Select</Button>
    <Button @click="submitFile">Upload</Button>
    <div  class="content">
      <img v-for="(image,index) in images" :class=picClassName(index+1) :src=picFileName(image) />
    </div>
  </div>
</template>

<script>
  export default {
    name: "photoGallary",
    props: {
      label: "",
    },
    inject:['reload'],
    data() {
      return {
        uploadFile: null,
        uploadFileName: null,
        images: [],
      }
    },
    created() {
      this.$http.get("/gallary/list")
        .then((response) => {
          this.images = response.data;
        })
    }
    ,
    methods: {
      picClassName(index){
        return "pic"+index;
      },
      picFileName(name){
        return "/imgs/"+name;
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
      submitFile() {
        if (null == this.uploadFile) {
          this.$message({
            type: 'info',
            message: '请选择要上传的文件'
          });
          return;
        }

        let formData = new FormData();
        formData.append('filename', this.uploadFileName);
        formData.append('file', this.uploadFile);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        };
        this.$http.post("/gallary", formData, config)
          .then((response) => {
              this.reload();
          })
      }
    }
  }
</script>

<style scoped>
  .back {
    background: url("../../../../static/imgs/img6.jpg") no-repeat top center fixed;
    background-size: cover;
  }

  .content {

    width: 500px;
    height: 400px;
    overflow: hidden;
    /*margin: 100px auto;*/
    position: relative;
  }

  img {
    z-index: 1;
    width: 20%;
    border-radius: 10px;
    height: auto;
    position: absolute;
    padding: 5px 5px 5px 5px;
    box-shadow: -2px 2px 4px #000000;
    background: #ffffff;
    /*border: 1px solid #CCCCCC;*/
    /* 动画的时间 */
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  img:hover {
    z-index: 2;
    transform: scale(1.5);
    -moz-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    box-shadow: -10px 10px 20px #000000;
    -moz-box-shadow: -10px 10px 20px #000000;
    -webkit-box-shadow: -10px 10px 20px #000000;
  }

  .pic1 {
    left: 100px;
    top: 50px;
    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);
    transform: rotate(20deg);
  }

  .pic2 {
    left: 230px;
    top: 60px;
    -webkit-transform: rotate(-10deg);
    -moz-transform: rotate(-10deg);
    transform: rotate(-10deg);
  }

  .pic3 {
    left: 380px;
    top: 60px;
    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);
    transform: rotate(20deg);
  }

  .pic4 {
    left: 50px;
    top: 150px;
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }

  .pic5 {
    left: 200px;
    top: 200px;
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  .pic6 {
    left: 300px;
    top: 200px;
    -webkit-transform: rotate(-15deg);
    -moz-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }

  .pic7 {
    left: 300px;
    top: 300px;
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  .pic8 {
    left: 200px;
    top: 300px;
    -webkit-transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    transform: rotate(15deg);
  }

  .pic9 {
    left: 80px;
    top: 300px;
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
    transform: rotate(5deg);
  }

</style>

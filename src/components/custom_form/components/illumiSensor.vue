<template>
  <md-card style="height: 100px">
    <md-subheader>
      {{this.label}}
    </md-subheader>
    <md-card-content>
      {{lumi}} lm
    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: "illumiSensor",
    props:{
      label:"",
    },
    data() {
      return {
        lumi: 0,
        host: "192.168.31.232",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI0OTZmN2UwYTk3Mjg0M2E5ODM4MDYwNzYyNjhmYWY0NSIsImlhdCI6MTU5MzU4NjgxMiwiZXhwIjoxOTA4OTQ2ODEyfQ.-nKtmG7h8O-bm_Df6_CTUaTRAjuiNj0NzfL15wxecI8",
        connection: null,
        messageId: 0,
      }
    },
    watch: {
    },
    computed: {
      dragOptions2() {
        return {
          group: {
            // 只允许放置shared的控件,禁止pull
            put: ["shared"]
          }
        }
      }
    },
    methods: {
      sendMessage: function (message) {
        console.log("send message: " + message);
        this.connection.send(message);
      },
      sendMessageObject: function (message) {
        console.log("send message: ", message);
        let str = JSON.stringify(message);
        this.connection.send(str);
      },

      subscribe_events: function () {
        let message = {
          "id": ++this.messageId,
          "type": "subscribe_events",
          // Optional
          "event_type": "state_changed"
        }
        this.sendMessageObject(message);
      },
      sendAuth: function () {
        let authMessage = {
          type: "auth",
          access_token: this.token,
        };
        this.sendMessageObject(authMessage)
      },
      call_service: function (domain, service, data) {
        let message = {
          "id": ++this.messageId,
          "type": "call_service",
          "domain": domain,
          "service": service,
          "service_data": data
        };
        this.sendMessageObject(message)
      },
      get_states: function () {
        let message = {
          "id": ++this.messageId,
          "type": "get_states",
        };
        this.sendMessageObject(message);
      },
      get_services: function () {
        let message = {
          "id": ++this.messageId,
          "type": "get_services",
        };
        this.sendMessageObject(message);
      },

      onmessage: function (event) {
        console.log(event);
        let data = JSON.parse(event.data);
        console.log("received data: ", data);

        if (data.hasOwnProperty("type")) {
          switch (data.type) {
            case "auth_required": {
              this.sendAuth();
              break
            }
            case "auth_ok": {
              console.log("authentication success")
              this.subscribe_events();
              this.get_states();
              this.get_services();
              break
            }
            case "auth_invalid": {
              console.log("authentication failed")
              break
            }
            case "result": {
              console.log("result: ", data.success)
              if (data.hasOwnProperty("result")) {
                let result = data.result;
                // console.log(result)
                for (let i in result) {
                  // console.log(result[i])
                  if (result[i]["entity_id"] === "sensor.illumination_04cf8c86ae3d") {
                    this.lumi = result[i]["state"];
                  }
                }
              }
              break
            }
            case "event": {
              this.onevent(data.event);
              break;
            }
          }
        }
      },
      onevent: function (event) {
        let data = event.data;
        console.log(data);
        switch (event.event_type) {

          case "state_changed": {
            if (data.entity_id === "sensor.illumination_04cf8c86ae3d") {
              console.log("device id:", data.entity_id);
              console.log("old state:", data.old_state.state);
              console.log("new state:", data.new_state.state);
              this.lumi = data.new_state.state;
            }

            break
          }
        }
      }
    },
    created: function () {
      console.log("Starting connection to HomeAssistant WebSocket server")
      this.connection = new WebSocket("ws://" + this.host + ":8123/api/websocket")

      this.connection.onmessage = this.onmessage;

      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the HomeAssistant websocket server...")
      }

    }
  }
</script>

<style scoped>
  button {
    margin: 0 auto;
  }
</style>

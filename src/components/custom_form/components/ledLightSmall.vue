<template>
  <md-card>
    <md-subheader>{{ this.label }}</md-subheader>
    <md-card-content style="text-align-last: justify">
          <input type="range" min="0" :max=maxValue v-model.number="inputValue">
          <span class="md-subheading">{{ inputValue }}</span>

    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: "ledLightSmall",
    props: {
      label:"",
      maxValue:""
    },
    data() {
      return {
        inputValue:0,
        // lighton: false,
        // color_r: 255,
        // color_g: 255,
        // color_b: 255,
        // brightness: 255,
        // host: "192.168.31.232",
        // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI0OTZmN2UwYTk3Mjg0M2E5ODM4MDYwNzYyNjhmYWY0NSIsImlhdCI6MTU5MzU4NjgxMiwiZXhwIjoxOTA4OTQ2ODEyfQ.-nKtmG7h8O-bm_Df6_CTUaTRAjuiNj0NzfL15wxecI8",
        // connection: null,
        // messageId: 0,
      }
    },
    watch: {
      // color(val) {
      //   this.lighton = true;
      //   this.turnOn();
      // },
      // brightness(val) {
      //   this.lighton = true;
      //   this.turnOn();
      // },
      //
      // lighton(val) {
      //   if (val) {
      //     this.turnOn()
      //   } else {
      //     this.turnOff()
      //   }
      // }
    },
    computed: {
      color() {
        let r = this.color_r.toString(16);
        let g = this.color_g.toString(16);
        let b = this.color_b.toString(16);
        if (r.length < 2) {
          r = '0' + r;
        }
        if (g.length < 2) {
          g = '0' + g;
        }
        if (b.length < 2) {
          b = '0' + b;
        }
        let res = '#' + r + g + b;
        return res;
      },
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
      turnOn() {
        let data = {
          entity_id: "light.gateway_light_04cf8c86ae3d",
          rgb_color: [this.color_r, this.color_g, this.color_b],
          brightness: this.brightness,
        };
        this.call_service("light", "turn_on", data)
      },
      turnOff() {
        let data = {
          entity_id: "light.gateway_light_04cf8c86ae3d",
        };
        this.call_service("light", "turn_off", data)
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
              break
            }
            case "auth_invalid": {
              console.log("authentication failed")
              break
            }
            case "result": {
              console.log("result: ", data.success)
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
            if (data.entity_id === "light.gateway_light_04cf8c86ae3d") {
              console.log("old state:", data.old_state.state);
              console.log("new state:", data.new_state.state);
              this.lighton = data.new_state.state === "on";
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

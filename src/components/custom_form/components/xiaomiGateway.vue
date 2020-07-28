<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">Xiaomi Aqara Gateway</div>
      </md-card-header>

      <md-card-content style="height: 380px">
        <div class="md-layout">
          <div class="md-layout-item ">
            <draggable>
              <md-card>
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-subheader style="float: left">
                      LED Light
                    </md-subheader>
                  </div>
                  <div class="md-layout-item md-size-25">
                    <input type="color" style="float: left;margin-top: 15px" v-bind:value="color">
                  </div>
                  <div class="md-layout-item md-size-25">
                    <md-switch v-model="lighton" style="float: right"></md-switch>
                  </div>
                </div>

                <md-card-content>
                  <md-list>
                    <md-list-item>
                      <span style="width: 25px" class="md-subheading">Red</span>
                      <input type="range" min="0" max="255" v-model.number="color_r">
                      <span class="md-subheading">{{ color_r }}</span>
                    </md-list-item>
                    <md-list-item>
                      <span style="width: 25px" class="md-subheading">Green</span>
                      <input type="range" min="0" max="255" v-model.number="color_g">
                      <span class="md-subheading">{{ color_g }}</span>
                    </md-list-item>
                    <md-list-item>
                      <span style="width: 25px" class="md-subheading">Blue </span>
                      <input type="range" min="0" max="255" v-model.number="color_b">
                      <span class="md-subheading">{{ color_b }}</span>
                    </md-list-item>
                    <md-list-item>
                      <span style="width: 25px" class="md-subheading">Bright </span>
                      <input type="range" min="0" max="255" v-model.number="brightness">
                      <span class="md-subheading">{{ brightness }}</span>
                    </md-list-item>

                  </md-list>


                </md-card-content>
                <md-card-actions>

                </md-card-actions>
              </md-card>
            </draggable>

          </div>
          <div class="md-layout-item md-size-25">
            <draggable :options="dragOptions2">
              <md-card style="height: 100px">
                <md-subheader>
                  Illuminance sensor
                </md-subheader>
                <md-card-content>
                  {{lumi}} lm
                </md-card-content>
              </md-card>
              <md-card>
                <md-subheader>
                  光照传感器
                </md-subheader>
                <md-card-content>
                  {{lumi}} lm
                </md-card-content>
              </md-card>
            </draggable>


          </div>
        </div>


      </md-card-content>


    </md-card>

  </div>
</template>

<script>

  import draggable from "vuedraggable";

  export default {
    components: {
      draggable
    },
    name: "xiaomiGateway",
    data() {
      return {
        lighton: false,
        lumi: 0,
        color_r: 255,
        color_g: 255,
        color_b: 255,
        brightness: 255,
        host: "localhost",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI0OTZmN2UwYTk3Mjg0M2E5ODM4MDYwNzYyNjhmYWY0NSIsImlhdCI6MTU5MzU4NjgxMiwiZXhwIjoxOTA4OTQ2ODEyfQ.-nKtmG7h8O-bm_Df6_CTUaTRAjuiNj0NzfL15wxecI8",
        connection: null,
        messageId: 0,
      }
    },
    watch: {
      color(val) {
        this.lighton = true;
        this.turnOn();
      },
      brightness(val) {
        this.lighton = true;
        this.turnOn();
      },

      lighton(val) {
        if (val) {
          this.turnOn()
        } else {
          this.turnOff()
        }
      }
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
        console.log(res);
        return res;
      },
      dragOptions2(){
        return{
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
            if (data.entity_id === "light.gateway_light_04cf8c86ae3d") {
              // console.log("brightness:",data.new_state.attributes.brightness)
              // console.log("hs_color:",data.new_state.attributes.hs_color)
              // console.log("rgb_color:",data.new_state.attributes.rgb_color)
              // this.rgb = data.new_state.attributes.rgb_color
              // console.log("xy_color:",data.new_state.attributes.xy_color)
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

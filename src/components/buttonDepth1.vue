<script>
// Importing stored values from vuex
import { mapGetters } from "vuex";
import _ from "lodash";

// Import all SVGS
import DeleteIcon from "../assets/svg/DeleteIcon.svg";

// Drag and Drop Functionality
import { Draggable } from "vue3-smooth-dnd";

export default {
  components: {
    DeleteIcon,
    Draggable,
  },
  props: ["id", "mid"],
  data() {
    return {
      formEdit: false,
      selectedMode: "postback", // Default Mode Postback
      title: "Button",
      payload: "Default",
    };
  },
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.mid);
    },
    simpleButton() {
      return this.message.data.message.attachment.payload.buttons;
    },
    mediaTemplateButton() {
      return this.message.data.message.attachment.payload.elements[0].buttons;
    },
    buttons() {
      return this.simpleButton ? this.simpleButton : this.mediaTemplateButton;
    },
    button() {
      return this.buttons.find((item) => item.id == this.id);
    },
  },
  methods: {
    toogleButtonForm: function () {
      this.formEdit = !this.formEdit;
    },
    deleteButton: function () {
      let buttons = _.reject(this.buttons, (e) => {
        return e.id == this.id;
      });
      if (this.simpleButton) {
        this.message.data.message.attachment.payload.buttons = buttons;
      } else {
        this.message.data.message.attachment.payload.elements[0].buttons =
          buttons;
      }
    },
    onFormChange: function (e) {
      let value = e.target.value;
      switch (e.target.id) {
        case this.id + "button-form-select":
          this.button.type = value;
          break;
        case this.id + "button-form-url-title":
        case this.id + "button-form-postback-title":
          this.button.title = value;
          break;
        case this.id + "button-form-postback-payload":
          this.button.payload = value;
          break;
        case this.id + "button-form-webview-url":
          this.button.url = value;
          break;
        case this.id + "button-form-webview-height":
          this.button.webview_height_ratio = value;
          break;
        case this.id + "button-form-webview-messenger-extension":
          this.button.messenger_extensions = value;
          break;
        case this.id + "button-form-webview-fallback-url":
          this.button.fallback_url = value;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<template>
  <Draggable class="d-flex align-items-center border rounded col-12 my-1">
    <!-- The only field that is allow to drag the element -->
    <span
      class="column-drag-handle p-1"
      style="float: left; padding: 0 10px; width: 5%"
      >&#x2630;</span
    >
    <!-- The only field that is allow to drag the element -->

    <!-- Form that we need to fill to complte JSON -->
    <div class="d-flex flex-column col-12" style="width: 90%">
      <div class="btn border" @click="toogleButtonForm" style="width: 100%">
        {{ button.title }}
      </div>
      <form
        class="border mb-1 col-12 rounded"
        v-if="formEdit"
        @input="onFormChange"
      >
        <div class="col-auto m-1">
          <label class="mr-2" :for="id + 'button-form-select'"
            >Preferences :</label
          >
          <select
            class="form-select mr-2"
            :id="id + 'button-form-select'"
            v-model="selectedMode"
          >
            <option value="postback" selected>Postback</option>
            <option value="web_url">Web url</option>
            <option value="phone_number">Phone Number</option>
          </select>
        </div>

        <div
          :hidden="
            !(selectedMode == 'postback' || selectedMode == 'phone_number')
          "
        >
          <div
            class="d-flex form-group m-1"
            v-for="item in [
              {
                id: 'button-form-postback-type',
                name: 'Type',
                value: selectedMode,
                disabled: true,
              },
              {
                id: 'button-form-postback-title',
                name: 'Title',
                value: button.title,
                disabled: false,
              },
              {
                id: 'button-form-postback-payload',
                name: 'payload',
                value: button.payload,
                disabled: false,
              },
            ]"
          >
            <label :for="id + item.id" class="col-3 col-form-label"
              >{{ item.name }} :</label
            >
            <div class="col-9">
              <input
                type="text"
                class="form-control"
                :id="id + item.id"
                :value="item.value"
                :disabled="item.disabled"
              />
            </div>
          </div>
        </div>

        <div class="m-1" :hidden="!(selectedMode == 'web_url')">
          <div
            class="d-flex form-group m-1"
            v-for="item in [
              {
                id: 'button-form-postback-type',
                name: 'Type',
                value: selectedMode,
                disabled: true,
              },
              {
                id: 'button-form-webview-url',
                name: 'Url',
                value: button.url,
                disabled: false,
              },
              {
                id: 'button-form-url-title',
                name: 'Title',
                value: button.title,
                disabled: false,
              },
            ]"
          >
            <label :for="id + item.id" class="col-3 col-form-label"
              >{{ item.name }} :</label
            >
            <div class="col-9">
              <input
                type="text"
                class="form-control"
                :id="id + item.id"
                :value="item.value"
                :disabled="item.disabled"
              />
            </div>
          </div>

          <div class="col-auto m-1">
            <label class="mr-2" :for="id + 'button-form-webview-height'"
              >webview_height_ratio</label
            >
            <select
              class="form-select mr-2"
              :id="id + 'button-form-webview-height'"
            >
              <option value="compact" selected>Compact</option>
              <option value="tall">Tall</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div class="col-auto m-1">
            <label
              class="mr-2"
              :for="id + 'button-form-webview-messenger-extension'"
              >messenger_extensions</label
            >
            <select
              class="form-select mr-2"
              :id="id + 'button-form-webview-messenger-extension'"
            >
              <option value="true" selected>True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div class="d-flex form-group m-1">
            <label
              :for="id + 'button-form-webview-fallback-url'"
              class="col-4 col-form-label"
              >fallback_url :</label
            >
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                :id="id + 'button-form-webview-fallback-url'"
                placeholder="Fallback Url"
                :value="button.fallback_url"
              />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center">
          <div
            class="btn text-white bg-secondary p-0 m-1 col-12"
            @click="toogleButtonForm"
          >
            Options
          </div>
        </div>
      </form>
    </div>
    <!-- Form that we need to fill to complte JSON -->

    <!-- Delete Button  -->
    <div
      class="d-flex align-items-center justify-content-center text-danger"
      @click="deleteButton"
      style="width: 5%"
    >
      <DeleteIcon />
    </div>
    <!-- Delete Button  -->
  </Draggable>
</template>

<style scoped>
* {
  font-size: small;
}

.btn:active {
  background-color: #004cd0c5 !important;
  color: white !important;
}
</style>

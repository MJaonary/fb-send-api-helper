<script>
import { JSONEditor } from "svelte-jsoneditor/dist/jsoneditor.js";

import axios from "axios";

// Importing stored values from vuex
import { mapGetters } from "vuex";

// Import all SVGS
import Exported from "../assets/svg/Exported.svg";

export default {
  name: "JsonEditorSimpleVue",
  emits: ["update:modelValue"],
  components: { Exported },
  data() {
    return {
      editor: null,
      editorFullScreen: false,
    };
  },
  props: {
    modelValue: {},
  },
  watch: {
    modelValue: {
      handler(content) {
        this.editor.set(content);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      content: "getContent",
      user_psid: "getUserPsid",
      page_access_token: "getLatestPageAccessToken",
    }),
  },
  methods: {
    initView: function () {
      let container = this.$refs.jsoneditor;
      this.editor = new JSONEditor({
        target: container,
        props: {
          mode: "code",
          onRenderMenu: (mode, items) => {
            let newItem = {
              title: "Copy Everything",
              icon: {
                prefix: "fas",
                iconName: "copy",
                icon: [
                  16,
                  16,
                  [],
                  null,
                  `M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z`,
                ],
              },
              onClick: () => {
                this.copyToClipboard(JSON.stringify(this.editor.get().json));
              },
            };
            items.push(newItem);
            newItem = {
              title: "Toogle Full Screen Mode",
              icon: {
                prefix: "fas",
                iconName: "evenodd",
                icon: [
                  16,
                  16,
                  [],
                  null,
                  `M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z `,
                ],
              },
              onClick: () => {
                this.toogleEditorFullScreen();
              },
            };
            items.push(newItem);
            return items;
          },
        },
      });
      this.editor.set(this.modelValue);
    },
    toogleEditorFullScreen: function () {
      this.editorFullScreen = !this.editorFullScreen;
    },
    copyToClipboard: async function (mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied");
      } catch (e) {
        alert(`Cannot copy ${e}`);
      }
    },
    modifyLatestAccessToken: function () {
      this.$store.commit(
        "updatePageAccessToken",
        this.$refs.page_access_token_input.value
      );
    },
    updatePsid: function () {
      this.$store.commit("updateUserPsid", this.$refs.input_user_psid.value);
    },
    sendMessage: async function () {
      let messagetoSend = JSON.stringify(this.modelValue.json);
      if (messagetoSend == "[]") {
        alert("There is nothing to send");
        return;
      } else {
        if (this.user_psid) {
          messagetoSend = messagetoSend.replaceAll(
            "{{User.id}}",
            this.user_psid
          );
        } else {
          alert("User PSID is not set");
          return;
        }
      }
      messagetoSend = JSON.parse(messagetoSend);
      for (let index = 0; index < messagetoSend.length; index++) {
        const element = messagetoSend[index];
        await this.callAPI(element);
      }
    },
    callAPI: async function (data) {
      try {
        await axios.request({
          url: "https://graph.facebook.com/v14.0/me/messages/",
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          params: {
            access_token: this.page_access_token,
          },
          data: data,
        });
      } catch (error) {
        alert(error.response?.data.error.message);
      }
    },
  },
  mounted() {
    this.initView();
  },
};
</script>

<template>
  <form class="d-flex flex-column border border-primary rounded">
    <div
      ref="jsoneditor"
      :class="editorFullScreen ? 'fullscreen' : 'notfullscreen'"
      class="jsoneditor"
    ></div>
    <div class="message-sender m-1">
      <label for="user_psid">PSID :</label>
      <div class="d-flex">
        <input
          class="input-psid form-control"
          id="user_psid"
          ref="input_user_psid"
          type="text"
          placeholder="Enter PSID"
          @input="updatePsid"
          :value="user_psid"
          name="user_psid"
          autocomplete="on"
        />
        <button class="d-flex p-2 m-0 align-items-center btn bg-primary text-white" @click.prevent="sendMessage">
          Send <Exported class="m-2" />
        </button>
      </div>
    </div>
    <div class="form-group m-1 p-1">
      <label for="page_access_token">Enter your Page Access Token here :</label>
      <input
        type="text"
        class="form-control"
        id="page_access_token"
        ref="page_access_token_input"
        :value="page_access_token"
        @input="modifyLatestAccessToken"
      />
    </div>
  </form>
</template>

<style scoped>
.jsoneditor {
  overflow: hidden;
  height: 90%;
}
.input-psid {
  margin: 10px;
  border-radius: 1rem;
}
.notfullscreen {
  content: "";
}

.fullscreen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  height: 99.5vh;
  width: 100%;
}
</style>

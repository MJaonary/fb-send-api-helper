<script>
// Importing Components
import buttonVue from "./buttonDepth1.vue";
import quickReplyVue from "./quickReply.vue";

// Importing stored values from vuex
import { mapGetters } from "vuex";

// Utils for generating UUID
import { generateUiid } from "./utils/generateuuids";

// Import all SVGS
import AddIcon from "../assets/svg/AddIcon.svg";

export default {
  components: {
    buttonVue,
    quickReplyVue,
    AddIcon,
  },
  props: ["id"],
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.id);
    },
    buttons() {
      return this.message.data.message.attachment.payload.buttons;
    },
    quick_replies() {
      return this.message?.data.message?.quick_replies;
    },
  },
  methods: {
    updateMessage: function (e) {
      this.message.data.message.text =
        this.message.data.message.attachment.payload.text = e.target.innerHTML;
    },
    addButton: function () {
      let button = {
        id: generateUiid(),
        type: "postback",
        title: "Button",
        payload: "Default_Payload",
        url: "https://example.com",
        webview_height_ratio: "compact",
        messenger_extensions: "true",
        fallback_url: "",
      };
      this.buttons.push(button); // TODO : Try to dispatch it
    },
    addQuickReply: function () {
      let quick_reply = {
        id: generateUiid(),
        content_type: "text",
        title: "Quick Reply",
        payload: "Default_Payload",
        image_url: "",
      };
      this.quick_replies.push(quick_reply); // TODO : Try to dispatch it
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column border border-primary rounded col-12 px-1">
    <div
      type="text"
      class="bubble"
      :class="{ 'with-buttons': buttons?.length }"
      contenteditable
      @input="updateMessage"
    >
      {{ message.data?.message?.text }}
    </div>
    <button-vue v-for="button in buttons" :id="button.id" :mid="id">
    </button-vue>
    <div
      class="btn border m-0 p-0 bg-primary text-white"
      @click="addButton"
      :hidden="buttons.length > 2"
    >
      <div
        class="d-flex align-items-center justify-content-center btn border bg-primary text-white"
      >
        <AddIcon />
        <div>Add Button</div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="d-flex flex-column align-items-center">
      <quick-reply-vue
        v-for="quick_reply in quick_replies"
        :id="quick_reply.id"
        :mid="id"
      ></quick-reply-vue>
    </div>
  </div>
  <div
    class="btn border m-0 p-0 bg-primary text-white container-fluid"
    @click="addQuickReply"
    :hidden="quick_replies?.length > 12"
  >
    <div
      class="d-flex align-items-center justify-content-center btn border bg-primary text-white"
    >
      <AddIcon />
      <div>Quick Reply</div>
    </div>
  </div>
</template>

<style>
/**All Bubble styles will be combined here */
.bubble {
  white-space: pre-wrap;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  color: rgba(0, 0, 0, 1);
  margin: 1px;
  padding: 6px 12px;
  box-sizing: border-box;
  clear: left;
  overflow-wrap: break-word;
  display: inline-block;
  border-radius: 1em;
}

.bubble.with-buttons {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0;
}

.btn:active {
  background-color: #004cd0c5 !important;
  color: white !important;
}

.quick-reply-container:focus {
  outline: none;
}

.quick-replies {
  text-align: center;
  padding-bottom: 10px;
  white-space: nowrap;
  line-height: 2em;
  overflow-x: auto;
}

.quick-replies .button {
  background: #fdfdfd;
  color: #0084ff;
  padding: 5px 10px;
  cursor: pointer;
  display: inline;
  border: 1px solid #afafaf;
  border-radius: 1em;
  margin: 5px;
}

.quick-reply-button,
.quick-reply-input {
  background: #fff;
  border-radius: 1em;
  color: #0084ff;
  display: inline-block;
  border: 1px solid #0084ff;
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

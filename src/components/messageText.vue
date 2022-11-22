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

// Drag and Drop Functionality
import { Container } from "vue3-smooth-dnd";
import { applyDrag } from "../components/utils/helpers";

export default {
  components: {
    buttonVue,
    quickReplyVue,
    AddIcon,
    Container,
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
        this.message.data.message.attachment.payload.text = e.target.innerText;
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
      this.buttons.push(button);
    },
    addQuickReply: function () {
      let quick_reply = {
        id: generateUiid(),
        content_type: "text",
        title: "Quick Reply",
        payload: "Default_Payload",
        image_url: "",
      };
      this.quick_replies.push(quick_reply);
    },
    onDropButton(dropResult) {
      this.content.json.find(
        (item) => item.id == this.id
      ).data.message.attachment.payload.buttons = applyDrag(
        this.buttons,
        dropResult
      );
    },
    onDropQuickReply(dropResult) {
      this.content.json.find(
        (item) => item.id == this.id
      ).data.message.quick_replies = applyDrag(
        this.quick_replies,
        dropResult
      );
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

    <Container
      @drop="onDropButton"
      drag-handle-selector=".column-drag-handle"
      :hidden="buttons.length === 0"
    >
      <button-vue
        v-for="button in buttons"
        :id="button.id"
        :mid="id"
        :key="button.id"
      >
      </button-vue>
    </Container>

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

  <Container
    @drop="onDropQuickReply"
    drag-handle-selector=".column-drag-handle"
    :hidden="quick_replies.length === 0"
  >
    <quick-reply-vue
      v-for="quick_reply in quick_replies"
      :id="quick_reply.id"
      :mid="id"
    ></quick-reply-vue>
  </Container>

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

<style scoped>
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
</style>

<script>
// Importing Components
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
    quick_replies() {
      return this.message?.data.message?.quick_replies;
    },
  },
  methods: {
    updateAttachmentId: function (e) {
      this.message.data.message.attachment.payload.attachment_id =
        e.target.value;
    },
    addQuickReply: function () {
      let quick_reply = {
        id: generateUiid(),
        content_type: "text",
        title: "Quick Reply",
        payload: "Default_Payload",
        image_url: "",
      };
      this.quick_replies.push(quick_reply); // TODO: Try to dispatch it
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
  <label>
    Paste {{ message.data.message.attachment.type }} attachment_id here :</label
  >
  <div class="d-flex flex-column border border-primary rounded col-12 px-1">
    <input
      type="text"
      class="bubble"
      :value="message.data.message.attachment.payload.attachment_id"
      @input="updateAttachmentId"
    />
  </div>
  <div class="container-fluid">
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

<style></style>

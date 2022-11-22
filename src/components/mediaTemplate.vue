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
  data() {
    return {
      selectedMode: "facebook_url",
      mediaSharable: false,
    };
  },
  props: ["id"],
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.id);
    },
    elements() {
      return this.message?.data.message.attachment.payload.elements[0];
    },
    buttons() {
      return this.elements.buttons;
    },
    quick_replies() {
      return this.message?.data.message?.quick_replies;
    },
    media_sharable() {
      this.message.data.message.attachment.payload.sharable = this.mediaSharable
        ? "true"
        : "false";
    },
  },
  methods: {
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
    onFormChange: function (e) {
      switch (e.target.id) {
        case this.id + "form_attachment_id":
          this.elements.attachment_id = e.target.value;
          this.elements.url = null;
          break;

        case this.id + "form_facebook_url":
          this.elements.url = e.target.value;
          this.elements.attachment_id = null;
          break;

        default:
          break;
      }
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
      ).data.message.quick_replies = applyDrag(this.quick_replies, dropResult);
    },
  },
};
</script>

<template>
  <div class="border p-1 rounded text-center">
    Media template {{ elements.media_type.toUpperCase() }}
    <img
      src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
      class="border p-1 rounded"
      style="width: 100%; height: 9rem; object-fit: contain"
    />

    <form class="border mb-1 col-12 rounded" @input="onFormChange">
      <div class="col-auto m-1">
        <label class="mr-2" :for="id + 'button-form-select'"
          >Preferences :</label
        >
        <select
          class="form-select mr-2"
          :id="id + 'button-form-select'"
          v-model="selectedMode"
        >
          <option value="facebook_url" selected>Facebook URL</option>
          <option value="attachment_id">Attachment ID</option>
        </select>
      </div>

      <div class="d-flex form-group m-1" v-if="selectedMode == 'attachment_id'">
        <label :for="id + 'form_attachment_id'" class="col-6 col-form-label"
          >Attachment_id :</label
        >
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            :id="id + 'form_attachment_id'"
            :value="elements.attachment_id"
          />
        </div>
      </div>

      <div class="d-flex form-group m-1" v-else>
        <label :for="id + 'form_facebook_url'" class="col-6 col-form-label"
          >Facebook URL :</label
        >
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            :id="id + 'form_facebook_url'"
            :value="elements.url"
          />
        </div>
      </div>
    </form>

    <Container
      @drop="onDropButton"
      drag-handle-selector=".column-drag-handle"
      :hidden="buttons.length === 0"
    >
      <button-vue
        v-for="button in buttons"
        :id="button.id"
        :mid="id"
      ></button-vue>
    </Container>

    <div
      class="btn border m-0 p-0 bg-primary text-white col-12"
      @click="addButton"
      :hidden="buttons.length > 0"
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

  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="false"
      id="checkmediaSharable"
      v-model="mediaSharable"
      @change="media_sharable"
    />
    <label class="form-check-label" for="checkmediaSharable">
      Media Sharable {{ mediaSharable }}
    </label>
  </div>
</template>

<style></style>

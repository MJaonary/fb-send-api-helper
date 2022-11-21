<script>
import { mapGetters } from "vuex";
import _ from "lodash";

// Import all SVGS
import DeleteIcon from "../assets/svg/DeleteIcon.svg";

export default {
  props: ["id", "mid"],
  data() {
    return {
      formEdit: true,
      selectedMode: "text",
    };
  },
  components: { DeleteIcon },
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.mid);
    },
    quick_replies() {
      return this.message.data.message.quick_replies;
    },
    quick_reply() {
      return this.quick_replies.find((item) => item.id == this.id);
    },
  },
  methods: {
    toogleButtonForm: function () {
      this.formEdit = !this.formEdit;
    },
    deleteQuickReply: function () {
      let quick_replies = _.reject(this.quick_replies, (e) => {
        return e.id == this.id;
      });
      this.content.json.find(
        (item) => item.id == this.mid
      ).data.message.quick_replies = quick_replies;
    },
    onFormChange: function (e) {
      let value = e.target.value;
      switch (e.target.id) {
        case this.id + "quick-reply-form-content-type":
          this.quick_reply.messenger_extensions = value;
          break;
        case this.id + "quick-reply-form-postback-title":
          this.quick_reply.title = value;
          break;
        case this.id + "quick-reply-form-postback-payload":
          this.quick_reply.payload = value;
          break;
        case this.id + "quick-reply-form-postback-image-url":
          this.quick_reply.image_url = value;
          break;
        default:
          break;
      }
      this.$store.commit("updateContent", this.content);
    },
  },
};
</script>

<template>
  <div
    class="d-flex flex-column m-1 p-0 align-items-center border rounded col-12 quick-reply-button"
  >
    <div class="d-flex col-12">
      <div class="btn border m-0 col-10" @click="toogleButtonForm">
        {{ quick_reply.title }}
      </div>
      <div
        class="d-flex align-items-center justify-content-center btn border col-2 text-white bg-danger fa-lg"
        @click="deleteQuickReply"
      >
        <DeleteIcon />
      </div>
    </div>
  </div>

  <form
    class="border my-1 py-1 rounded col-12"
    :hidden="formEdit"
    @input="onFormChange"
  >
    <div class="col-auto m-1">
      <label class="mr-2" :for="id + 'quick-reply-form-content-type'"
        >Content_type :</label
      >
      <select
        class="form-select mr-2"
        :id="id + 'quick-reply-form-content-type'"
        v-model="selectedMode"
      >
        <option value="text" selected>Text</option>
      </select>
    </div>
    <div class="d-flex form-group m-1">
      <label
        :for="id + 'quick-reply-form-postback-title'"
        class="col-3 col-form-label"
        >Title :</label
      >
      <div class="col-9">
        <input
          type="text"
          class="form-control"
          :id="id + 'quick-reply-form-postback-title'"
          :value="quick_reply.title"
        />
      </div>
    </div>
    <div class="d-flex form-group m-1">
      <label
        :for="id + 'quick-reply-form-postback-payload'"
        class="col-3 col-form-label"
        >Payload :
      </label>
      <div class="col-9">
        <input
          type="text"
          class="form-control"
          :id="id + 'quick-reply-form-postback-payload'"
          :value="quick_reply.payload"
        />
      </div>
    </div>
    <div class="d-flex form-group m-1">
      <label
        :for="id + 'quick-reply-form-postback-image-url'"
        class="col-3 col-form-label"
        >Image-url :
      </label>
      <div class="col-9">
        <input
          type="text"
          class="form-control"
          :id="id + 'quick-reply-form-postback-image-url'"
          :value="quick_reply.image_url"
        />
      </div>
    </div>
    <div
      class="btn text-white bg-secondary p-0 col-12"
      @click="formEdit = true"
    >
      Hide options
    </div>
  </form>
</template>

<style scoped></style>

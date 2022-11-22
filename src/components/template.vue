<script>
// Importing Components
import buttonVue from "./buttonDepth2.vue";
import defaultActionVue from "./defaultAction.vue";
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
    defaultActionVue,
    AddIcon,
    Container,
  },
  props: ["id", "mid", "index", "class"],
  emits: ["onDeleteElement"],
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.mid);
    },
    elements() {
      return this.message?.data.message.attachment.payload.elements;
    },
    element() {
      return this.elements.find((item) => item.id == this.id);
    },
    buttons() {
      return this.element.buttons;
    },
    default_action() {
      return this.element.default_action;
    },
  },
  methods: {
    elementInput: function (e) {
      let element = this.element;
      switch (e.target.id) {
        case this.id + "-input-image_url":
          element.image_url = e.target.value;
          break;
        case this.id + "-input-title":
          element.title = e.target.value || "Title";
          break;
        case this.id + "-input-subtitle":
          element.subtitle = e.target.value || "Subtitle";
          break;
        default:
          break;
      }
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
    deleteElement: function (id) {
      this.$emit("onDeleteElement", this.index);
      this.message.data.message.attachment.payload.elements =
        this.elements.filter((item) => {
          return item.id != id;
        });
    },
    addDefaultAction: function () {
      let default_action = {
        type: "web_url",
        url: "https://example.com",
        webview_height_ratio: "compact",
        messenger_extensions: "true",
        fallback_url: "",
      };
      this.element.default_action = default_action;
    },
    onDropButton(dropResult) {
      this.content.json
        .find((item) => item.id == this.mid)
        .data.message.attachment.payload.elements.find(
          (item) => item.id == this.id
        ).buttons = applyDrag(this.buttons, dropResult);
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column" @input="elementInput">
    <div class="border" style="position: relative">
      <!-- Displayed Image from URL -->
      <img
        :src="
          element.image_url ||
          'https://mdbcdn.b-cdn.net/img/new/slides/043.webp'
        "
        class="d-block w-100"
        alt="Exotic Fruits"
        style="width: 100%; height: 9rem; object-fit: contain"
      />
      <!-- Displayed Image from URL -->

      <!-- Current page displayer -->
      <div class="index-container d-flex flex-column align-items-center">
        <h2>
          {{ index }}
        </h2>
        <h2
          style="
            left: 0;
            background-color: red;
            color: white;
            border-radius: 20%;
            width: 1em;
            display: flex;
            justify-content: center;
          "
        >
          {{ elements.length - 1 }}
        </h2>
      </div>
      <!-- Current page displayer -->

      <!-- Template Image URL -->
      <input
        :id="id + '-input-image_url'"
        type="text"
        class="text-center centered templates-input"
        placeholder="Paste Url Here"
        :value="element.image_url"
      />
      <!-- Template Image URL -->

      <!-- Template Title -->
      <input
        :id="id + '-input-title'"
        type="text"
        class="text-center col-12"
        placeholder="Title"
        :value="element.title"
      />
      <!-- Template Title -->

      <!-- Template Subtitle -->
      <input
        :id="id + '-input-subtitle'"
        type="text"
        class="text-center mt-1 col-12"
        placeholder="Subtitle"
        :value="element.subtitle"
      />
      <!-- Template Subtitle -->
    </div>

    <!-- Default action conditional -->
    <default-action-vue
      v-if="default_action"
      id="123456789"
      :mid="mid"
      :eid="id"
    ></default-action-vue>
    <!-- Default action conditional -->

    <!-- Default action adder -->
    <div
      class="btn border m-0 p-0 bg-primary text-white"
      @click="addDefaultAction"
      :hidden="default_action"
    >
      <div
        class="d-flex align-items-center justify-content-center btn border bg-primary text-white"
      >
        <AddIcon />
        <div>Add Default action</div>
      </div>
    </div>
    <!-- Default action adder -->

    <!-- Buttons that can be draged and droped to reorder them -->
    <Container
      @drop="onDropButton"
      drag-handle-selector=".column-drag-handle"
      :hidden="buttons.length === 0"
      orientation="vertical"
    >
      <button-vue
        v-for="button in buttons"
        :id="button.id"
        :mid="mid"
        :eid="id"
      ></button-vue>
    </Container>
    <!-- Buttons that can be draged and droped to reorder them -->

    <!-- Button adder  -->
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
    <!-- Button adder  -->

    <!-- Delete element with his Index number -->
    <div class="d-flex justify-content-center">
      <div
        class="btn btn-danger p-0 m-1 col-12 text-white"
        :hidden="elements.length == 1"
        @click="deleteElement(id)"
      >
        Delete Element Number: {{ index }}
      </div>
    </div>
    <!-- Delete element with his number -->
  </div>
</template>

<style scoped>
.index-container {
  opacity: 25%;
  position: absolute;
  right: 0;
  top: 15%;
  border: 1px solid black;
  border-radius: 20%;
  width: 10%;
  display: flex;
  justify-content: center;
}

/* Centered text */
.centered {
  font-weight: bold;
  color: rgb(9, 7, 7);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.templates-input,
.templates-input:focus {
  outline: none;
  border: none;
  background: transparent;
  color: black;
}
</style>

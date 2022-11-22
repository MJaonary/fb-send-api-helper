<script>
// Importing Components
import templateVue from "./template.vue";
import quickReplyVue from "./quickReply.vue";

// Importing stored values from vuex
import { mapGetters } from "vuex";
import { generateUiid } from "./utils/generateuuids";

// Import all SVGS
import AddIcon from "../assets/svg/AddIcon.svg";

// Drag and Drop Functionality
import { Container } from "vue3-smooth-dnd";
import { applyDrag } from "../components/utils/helpers";

export default {
  components: {
    quickReplyVue,
    templateVue,
    AddIcon,
    Container,
  },
  props: ["id"],
  data() {
    return {
      // Workaround about incompatibility between vue v-for and bootstrap carousel active class
      // There are two handler for the bootstrap carousel slide,
      // We need to activate the first element of it only once.
      activated: 0, // The simple solution is to handle it ourselves.
      imageSquared: false,
    };
  },
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.id);
    },
    elements() {
      return this.message?.data.message.attachment.payload.elements;
    },
    quick_replies() {
      return this.message?.data.message?.quick_replies;
    },
  },
  methods: {
    addElement: function () {
      this.activated = this.elements.length;
      let element = {
        id: generateUiid(),
        title: "Title",
        image_url: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", // Default Image template.
        subtitle: "Subtitle",
        default_action: null,
        buttons: [],
      };
      this.elements.push(element);
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
    onDropQuickReply(dropResult) {
      this.content.json.find(
        (item) => item.id == this.id
      ).data.message.quick_replies = applyDrag(this.quick_replies, dropResult);
    },
    onDeleteElement(index) {
      if (index == 0) {
        this.activated = this.elements.length - 2;
      } else {
        this.activated = index - 1;
      }
    },
    image_aspect_ratio() {
      this.message.data.message.attachment.payload.image_aspect_ratio = this
        .imageSquared
        ? "square"
        : "horizontal";
    },
    // TODO : Use Carousel to remove these navigations
    next: function () {
      this.activated++;
      if (this.activated > this.elements.length - 1) {
        this.activated = 0;
      }
    },
    prev: function () {
      this.activated--;
      if (this.activated < 0) {
        this.activated = this.elements.length - 1;
      }
    },
    // TODO : Use Carousel to remove these navigations
  },
};
</script>

<template>
  <div class="carousel slide" data-bs-interval="false" style="width: 100%">
    <!-- Template loop here // TODO : Use Carousel -->
    <div class="carousel-inner" style="width: 100%">
      <template-vue
        v-for="(element, index) in elements"
        :id="element.id"
        :mid="id"
        :index="index"
        :class="{ active: index == activated }"
        @onDeleteElement="onDeleteElement"
      >
      </template-vue>

      <a
        class="carousel-control-prev"
        type="button"
        data-bs-slide="prev"
        @click="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        type="button"
        data-bs-slide="next"
        @click="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>
    <!-- Template loop here // TODO : Use Carousel -->

    <!-- Element adder  -->
    <div
      class="btn border mt-1 p-0 bg-primary text-white col-12"
      @click="addElement"
      :hidden="elements.length > 9"
    >
      <div
        class="d-flex align-items-center justify-content-center btn border bg-primary text-white"
      >
        <AddIcon />
        <div>Add Element</div>
      </div>
    </div>
    <!-- Element adder  -->

    <!-- Quick Replies that can be draged and droped to reorder them -->
    <Container
      @drop="onDropQuickReply"
      drag-handle-selector=".column-drag-handle"
      :hidden="quick_replies.length === 0"
      orientation="vertical"
    >
      <quick-reply-vue
        v-for="quick_reply in quick_replies"
        :id="quick_reply.id"
        :mid="id"
      ></quick-reply-vue>
    </Container>
    <!-- Quick Replies that can be draged and droped to reorder them -->

    <!-- Quick Replies adder -->
    <div
      class="btn border m-0 p-0 bg-primary text-white container-fluid"
      @click="addQuickReply"
      :hidden="quick_replies.length > 12"
    >
      <div
        class="d-flex align-items-center justify-content-center btn border bg-primary text-white"
      >
        <AddIcon />
        <div>Quick Reply</div>
      </div>
    </div>
    <!-- Quick Replies adder -->
  </div>

  <!-- Image Aspect ratio switcher -->
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value="false"
      id="checkImageSquared"
      v-model="imageSquared"
      @change="image_aspect_ratio"
    />
    <label class="form-check-label" for="checkImageSquared">
      Image Aspect Ratio Squared
    </label>
  </div>
  <!-- Image Aspect ratio switcher -->
</template>

<style scoped>
.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  background-color: rgba(12, 105, 235, 0.827);
  width: 5rem;
  height: 5rem;
}

.carousel-control-prev-icon:active,
.carousel-control-next-icon:active {
  background-color: rgb(13, 100, 222);
}

.quick-reply-container:focus {
  outline: none;
}
</style>

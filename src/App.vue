<script>
// Importing all Components
import jsonEditorVue from "./components/jsonEditor.vue";
import jsonEditorSimpleVue from "./components/jsonEditorSimple.vue";
import messageTextVue from "./components/messageText.vue";
import genericTemplatesVue from "./components/genericTemplates.vue";
import attachementUploaderVue from "./components/attachementUploader.vue";
import mediaTemplateVue from "./components/mediaTemplate.vue";
import fileSendVue from "./components/fileSend.vue";
import personalizedElementsVue from "./components/personalizedElements.vue";

// Import all SVGS
import MenuIcon from "./assets/svg/MenuIcon.svg";
import Attachment from "./assets/svg/Attachment.svg";
import Exported from "./assets/svg/Exported.svg";
import DeleteIcon from "./assets/svg/DeleteIcon.svg";

// Importing all Mixins
import exporterFunctionsVue from "./exporterFunctions.vue";
import elementsAdderVue from "./elementsAdder.vue";

// Importing stored values from vuex
import { mapGetters, Store } from "vuex";

// Drag and Drop Functionality
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from "./components/utils/helpers";

export default {
  data() {
    return {
      toggleMenu: "main_menu",
      exported: {
        json: [],
      },
    };
  },
  components: {
    // Vue Components
    jsonEditorVue,
    messageTextVue,
    genericTemplatesVue,
    mediaTemplateVue,
    fileSendVue,
    personalizedElementsVue,
    // Menu Components
    jsonEditorSimpleVue,
    attachementUploaderVue,
    // Drag and Drop Functionalities
    Container,
    Draggable,
    // SVG Imported as Components
    MenuIcon,
    Attachment,
    Exported,
    DeleteIcon,
  },
  mixins: [exporterFunctionsVue, elementsAdderVue],
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
  },
  methods: {
    // This function will clear everything content
    clearAll: function () {
      this.content.json = [];
    },
    onDrop(dropResult) {
      let content = applyDrag(this.content.json, dropResult);
      this.$store.commit("updateContent", { json: content });
    },
  },
};
</script>

<template>
  <div class="d-flex border" style="height: 100%; width: 100%">
    <!-- Side Menu that will helps switching between functionalities -->
    <div class="d-flex flex-column border" :style="`height: 100%`">
      <div
        v-for="item in [
          { name: 'main_menu', title: 'Main Menu', type: 'MenuIcon' },
          {
            name: 'attachment_uploader',
            title: 'Attachment Uploader',
            type: 'Attachment',
          },
          { name: 'json_editor', title: 'JSON Editor', type: 'Exported' },
        ]"
        class="btn p-2"
        data-toggle="tooltip"
        data-placement="right"
        :title="item.title"
        :style="`${
          item.name === toggleMenu ? 'border-left: 2px solid' : ''
        }; border-radius: 0`"
        @click="toggleMenu = item.name"
      >
        <component :is="item.type"></component>
      </div>
    </div>
    <!-- Side Menu that will helps switching between functionalities -->

    <!-- Main component that helps creating and editing messages -->
    <div
      v-if="toggleMenu == 'main_menu'"
      class="d-flex justify-content-start"
      style="width: 100%"
    >
      <div class="d-flex flex-column p-1 border col-2">
        <div class="p-2 border text-center font-weight-bold">
          Facebook Responses
        </div>
        <div class="mb-1 d-flex flex-column align-items-center">
          <div
            class="btn btn-outline-primary m-1 col-11"
            v-for="item in [
              { text: 'Text + Button', onClick: addTextMessageTemplate },
              { text: 'File', onClick: () => addFile('file') },
              {
                text: 'Image URL',
                onClick: () => addMediaTemplate('image'),
              },
              { text: 'Image ID', onClick: () => addFile('image') },
              {
                text: 'Video URL',
                onClick: () => addMediaTemplate('video'),
              },
              { text: 'Video ID', onClick: () => addFile('video') },
              { text: 'Audio', onClick: () => addFile('audio') },
              { text: 'Card Generic', onClick: addGenericTemplate },
              {
                text: 'Pause',
                onClick: () => addPersonalizedElements('pause'),
              },
              // {
              //   text: 'MessageID',
              //   onClick: () => addPersonalizedElements('mid'),
              // },
            ]"
            @click="item.onClick"
          >
            {{ item.text }}
          </div>

          <div class="col-12 m-2"></div>
        </div>
        <div class="row text-center justify-content-center">
          <div
            class="btn btn-primary m-1 col-5"
            :class="item.class"
            v-for="item in [
              { title: 'Export', onClick: exportAll },
              { title: 'Clear', class: 'btn-danger', onClick: clearAll },
            ]"
            @click="item.onClick"
          >
            {{ item.title }}
          </div>
        </div>
      </div>

      <div class="d-flex flex-column p-1 border overflow-scroll col-4">
        <div class="p-2 mb-1 fb-opt-header border text-center mb-1">
          Parameters Options
        </div>

        <Container
          class="display d-flex flex-column h-100 align-items-center"
          drag-handle-selector=".column-drag-handle"
          @drop="onDrop"
          orientation="vertical"
        >
          <!-- Looping Rendering here -- Begin -->
          <Draggable
            v-for="items in content.json"
            class="col-12"
            :key="items.id"
          >
            <div class="d-flex border rounded my-1" style="width: 100%">
              <span
                class="d-flex align-items-center justify-content-center column-drag-handle my-1"
                style="width: 5%"
                >&#x2630;</span
              >
              <div
                class="d-flex flex-column my-1 p-1 justify-content-center"
                style="width: 90%"
              >
                <component :is="items.name" :id="items.id"></component>
              </div>
              <span
                class="d-flex align-items-center justify-content-center my-1 text-danger"
                @click="deleteComponentId(items.id)"
                style="width: 5%"
              >
                <DeleteIcon />
              </span>
            </div>

            <div class="separator"></div>
          </Draggable>
          <!-- Looping Rendering here -- End   -->
        </Container>
      </div>

      <!-- We just have to listen to $store.state.content here -->
      <div class="d-flex flex-column p-1 mb-1 border col-6">
        <div class="p-2 fb-opt-header border text-center mb-1">JSON Output</div>
        <json-editor-vue
          :modelValue="content"
          class="h-100 overflow-hidden"
        ></json-editor-vue>
      </div>
    </div>
    <!-- Main component that helps creating and editing messages -->

    <!-- Attachment Uploader utility -->
    <div class="col-12" v-if="toggleMenu === 'attachment_uploader'">
      <attachement-uploader-vue></attachement-uploader-vue>
    </div>
    <!-- Attachment Uploader utility -->

    <!-- Json editor that display the final result and send message -->
    <div style="width: 100%" v-if="toggleMenu === 'json_editor'">
      <json-editor-simple-vue
        :model-value="exported"
        class="h-100 overflow-hidden"
      ></json-editor-simple-vue>
    </div>
    <!-- Json editor that display the final result and send message -->
  </div>
</template>

<style>
.column-drag-handle:hover {
  cursor: grab;
}
</style>

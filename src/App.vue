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

// Importing all Mixins
import exporterFunctionsVue from "./exporterFunctions.vue";
import elementsAdderVue from "./elementsAdder.vue";

// Importing stored values from vuex
import { mapGetters } from "vuex";

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
    // SVG Imported as Components
    MenuIcon,
    Attachment,
    Exported,
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
  },
};
</script>

<template>
  <!-- Side Menu that will helps switching between functionalities -->
  <div class="d-flex border" style="height: 100%; width: 100%">
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

    <div
      v-if="toggleMenu == 'main_menu'"
      class="d-flex justify-content-start"
      style="width: 100%"
    >
      <div class="d-flex flex-column p-1 border col-2">
        <div class="p-2 border text-center font-weight-bold">Facebook Responses</div>
        <div class="mb-1  d-flex flex-column align-items-center">
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
              // {
              //   text: 'Pause',
              //   onClick: () => addPersonalizedElements('pause'),
              // },
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

      <div class="d-flex flex-column p-1 border overflow-hidden col-4">
        <div class="p-2 mb-1 fb-opt-header border text-center mb-1">Parameters Options</div>
        <div class="display d-flex flex-column h-100 align-items-center">
          <!-- Looping Rendering here -- Begin -->
          <div v-for="items in content.json" class="col-12">
            <div class="d-flex flex-column justify-content-center">
              <component :is="items.name" :id="items.id"></component>
              <div
                class="btn border border-danger text-danger p-0 m-1"
                @click="deleteComponentId(items.id)"
              >
                Delete Template
              </div>
            </div>
            <div class="separator"></div>
          </div>
          <!-- Looping Rendering here -- End   -->
        </div>
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

    <div class="col-12" v-if="toggleMenu === 'attachment_uploader'">
      <attachement-uploader-vue></attachement-uploader-vue>
    </div>

    <div style="width: 100%" v-if="toggleMenu === 'json_editor'">
      <json-editor-simple-vue
        :model-value="exported"
        class="h-100 overflow-hidden"
      ></json-editor-simple-vue>
    </div>
  </div>
</template>

<style></style>

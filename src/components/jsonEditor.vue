<script>
import { JSONEditor } from "svelte-jsoneditor/dist/jsoneditor.js";

// Importing stored values from vuex
import { mapGetters } from "vuex";

export default {
  name: "JsonEditorVue",
  emits: ["update:modelValue"],
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
    }),
  },
  methods: {
    initView: function () {
      let container = this.$refs.jsoneditor;
      this.editor = new JSONEditor({
        target: container,
        props: {
          onChange: (content) => {
            // TODO : Verify if a new key is added and revert change.
            let contentjsonResult = this.editor.get().text
              ? {
                  json: JSON.parse(this.editor.get().text),
                }
              : this.editor.get();
            this.$store.commit("updateContent", contentjsonResult);
          },
          onRenderMenu: (mode, items) => {
            let newItem = {
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
  },
  mounted() {
    this.initView();
  },
};
</script>

<template>
  <div class="border border-primary rounded">
    <div
      ref="jsoneditor"
      :class="editorFullScreen ? 'fullscreen' : 'notfullscreen'"
      class="h-100 jsoneditor"
    ></div>
  </div>
</template>

<style>
.jsoneditor {
  overflow: hidden;
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

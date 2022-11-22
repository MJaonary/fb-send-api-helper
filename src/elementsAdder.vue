<script>
import { mapGetters } from "vuex";
import _ from "lodash";

import { generateUiid } from "./components/utils/generateuuids";

export default {
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
  },
  methods: {
    addTextMessageTemplate: function () {
      let data = {
        id: generateUiid(),
        name: "message-text-vue",
        data: {
          messaging_type: "RESPONSE",
          recipient: {
            id: "{{User.id}}",
          },
          message: {
            text: "Enter a text message...",
            quick_replies: [],
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                text: "Enter a text message...",
                buttons: [],
              },
            },
          },
        },
      };
      this.$store.commit("pushJson", data);
    },
    addGenericTemplate: function () {
      let data = {
        id: generateUiid(),
        name: "generic-templates-vue",
        data: {
          messaging_type: "RESPONSE",
          recipient: {
            id: "{{User.id}}",
          },
          message: {
            quick_replies: [],
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                image_aspect_ratio: "horizontal",
                elements: [
                  {
                    id: generateUiid(),
                    title: "Title",
                    image_url:
                      "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
                    subtitle: "Subtitle",
                    default_action: null,
                    buttons: [],
                  },
                ],
              },
            },
          },
        },
      };
      this.$store.commit("pushJson", data);
    },
    addFile: function (filetype) {
      let data = {
        id: generateUiid(),
        name: "file-send-vue",
        data: {
          messaging_type: "RESPONSE",
          recipient: {
            id: "{{User.id}}",
          },
          message: {
            quick_replies: [],
            attachment: {
              type: filetype,
              payload: {
                attachment_id: "",
              },
            },
          },
        },
      };
      this.$store.commit("pushJson", data);
    },
    addMediaTemplate: function (filetype) {
      let data = {
        id: generateUiid(),
        name: "media-template-vue",
        data: {
          messaging_type: "RESPONSE",
          recipient: {
            id: "{{User.id}}",
          },
          message: {
            quick_replies: [],
            attachment: {
              type: "template",
              payload: {
                template_type: "media",
                sharable: "false",
                elements: [
                  {
                    id: generateUiid(),
                    buttons: [],
                    media_type: filetype,
                    url: null,
                    attachment_id: "",
                  },
                ],
              },
            },
          },
        },
      };
      this.$store.commit("pushJson", data);
    },
    addPersonalizedElements: function (type) {
      let data = {
        id: generateUiid(),
        name: "personalized-elements-vue",
        data: {},
      };
      switch (type) {
        case "pause":
          data.data.pause = "1000";
          break;

        case "mid":
          data.data.mid = "#0";
          break;

        default:
          break;
      }
      this.$store.commit("pushJson", data);
    },
    deleteComponentId: function (id) {
      this.$store.commit("deleteTemplateId", id);
    },
  },
};
</script>

<template></template>

<style></style>

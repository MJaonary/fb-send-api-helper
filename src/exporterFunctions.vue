<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
  },
  methods: {
    exportAll: function () {
      // We need a new element to process without touching the rendering array
      // (that is due to the direct reference to the store PROXY), an workaround is required.
      let temporaryTextJson = JSON.stringify(this.content.json);
      let newContent = JSON.parse(temporaryTextJson);

      let result = [];
      newContent.forEach((element) => {
        switch (element.name) {
          case "message-text-vue":
            {
              if (element.data.message.attachment.payload.buttons.length == 0) {
                delete element.data.message.attachment;
              } else {
                element.data.message.attachment.payload.text =
                  element.data.message.text;
                element.data.message.attachment.payload.buttons.forEach(
                  (element) => {
                    delete element.id;
                    if (
                      element.type == "postback" ||
                      element.type == "phone_number"
                    ) {
                      delete element.url;
                      delete element.webview_height_ratio;
                      delete element.messenger_extensions;
                      delete element.fallback_url;
                    } else {
                      delete element.payload;
                      if (element.fallback_url == "") {
                        delete element.fallback_url;
                      }
                    }
                  }
                );
                delete element.data.message.text;
              }
              if (element.data.message.quick_replies.length == 0) {
                delete element.data.message.quick_replies;
              } else {
                element.data.message.quick_replies.forEach((element) => {
                  delete element.id;
                });
              }
              result.push(element.data);
            }
            break;

          case "generic-templates-vue":
            {
              if (element.data.message.quick_replies.length == 0) {
                delete element.data.message.quick_replies;
              } else {
                element.data.message.quick_replies.forEach((element) => {
                  delete element.id;
                });
              }
              element.data.message.attachment.payload.elements.forEach(
                (elemen) => {
                  if (elemen.default_action == null) {
                    delete elemen.default_action;
                  }
                }
              );
              element.data.message.attachment.payload.elements.forEach(
                (element) => {
                  delete element.id;
                  if (element.buttons.length == 0) {
                    delete element.buttons;
                  } else {
                    element.buttons.forEach((element) => {
                      delete element.id;
                      if (
                        element.type == "postback" ||
                        element.type == "phone_number"
                      ) {
                        delete element.url;
                        delete element.webview_height_ratio;
                        delete element.messenger_extensions;
                        delete element.fallback_url;
                      } else {
                        delete element.payload;
                        if (element.fallback_url == "") {
                          delete element.fallback_url;
                        }
                      }
                    });
                  }
                }
              );

              result.push(element.data);
            }
            break;

          case "file-send-vue":
            {
              if (element.data.message.quick_replies.length == 0) {
                delete element.data.message.quick_replies;
              } else {
                element.data.message.quick_replies.forEach((element) => {
                  delete element.id;
                });
              }
              result.push(element.data);
            }
            break;

          case "media-template-vue":
            {
              let message = element.data.message;
              if (message.quick_replies.length == 0) {
                delete message.quick_replies;
              } else {
                message.quick_replies.forEach((element) => {
                  delete element.id;
                });
              }
              let elements = message.attachment.payload.elements[0];
              delete elements.id;
              if (elements.buttons.length < 1) {
                delete elements.buttons;
              } else {
                delete elements.buttons[0].id;
                let element = elements.buttons[0];
                if (
                  element.type == "postback" ||
                  element.type == "phone_number"
                ) {
                  delete element.url;
                  delete element.webview_height_ratio;
                  delete element.messenger_extensions;
                  delete element.fallback_url;
                } else {
                  delete element.payload;
                }
              }
              if (elements.url) {
                delete elements.attachment_id;
              } else {
                delete elements.url;
              }
              result.push(element.data);
            }
            break;

          case "personalized-elements-vue":
            {
              result.push(element.data);
            }
            break;

          default:
            break;
        }
      });
      this.exported.json = result;
      this.copyToClipboard(JSON.stringify(result));
    },
    copyToClipboard: async function (mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        alert("Copied");
      } catch (e) {
        alert(`Cannot copy ${e}`);
      }
    },
  },
};
</script>

<template></template>

<style></style>

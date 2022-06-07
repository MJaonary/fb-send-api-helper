<script setup>
import JsonEditorVue from './components/jsonEditor.vue';
import messageTextVue from './components/messageText.vue';
import { mapGetters } from 'vuex';
import { generateUiid } from './components/utils/generateuuids';

import genericTemplatesVue from './components/genericTemplates.vue'

import _ from "lodash";
</script>

<script>
export default {
    data() {
        return {
            temporary: ''
        }
    },
    components: {
        messageTextVue,
        genericTemplatesVue
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        })
    },
    methods: {
        exportAll: function () {
            // We need a new element to process without touching the rendering array
            // (that due to the direct reference to the store), we need an workaround. 
            let temporaryTextJson = JSON.stringify(this.content.json);
            let content = JSON.parse(temporaryTextJson);

            let result = [];
            content.forEach(element => {
                switch (element.name) {
                    case 'message-text-vue': {
                        if (element.data.message.buttons.length == 0) {
                            delete element.data.message.buttons;
                        } else {
                            element.data.message.buttons.forEach(element => {
                                delete element.id;
                                if (element.type == 'postback' || 'phone_number') {
                                    delete element.url;
                                    delete element.webview_height_ratio;
                                    delete element.messenger_extensions;
                                    delete element.fallback_url;
                                } else {
                                    delete element.payload;
                                }
                            })
                            element.data.message.attachment = {
                                type: "template",
                                payload: {
                                    template_type: "button",
                                    text: element.data.message.text,
                                    buttons: element.data.message.buttons,
                                }
                            };
                            delete element.data.message.text;
                            delete element.data.message.buttons;
                        };
                        if (element.data.message.quick_replies.length == 0) {
                            delete element.data.message.quick_replies;
                        } else {
                            element.data.message.quick_replies.forEach(element => {
                                delete element.id;
                            })
                        }
                        result.push(element.data);
                    }
                        break;

                    case 'generic-templates-vue': {
                        if (element.data.message.quick_replies.length == 0) {
                            delete element.data.message.quick_replies;
                        } else {
                            element.data.message.quick_replies.forEach(element => {
                                delete element.id;
                            });
                        }

                        element.data.message.attachment.payload.elements.forEach(elemen => {
                            if (elemen.default_action == null) {
                                delete elemen.default_action;
                            }
                        })

                        element.data.message.attachment.payload.elements.forEach(element => {
                            delete element.id;
                            if (element.buttons.length == 0) {
                                delete element.buttons;
                            } else {
                                element.buttons.forEach(element => {
                                    delete element.id
                                    if (element.type == 'postback' || 'phone_number') {
                                        delete element.url;
                                        delete element.webview_height_ratio;
                                        delete element.messenger_extensions;
                                        delete element.fallback_url;
                                    } else {
                                        delete element.payload;
                                    }
                                })
                            }
                        });
                        
                        result.push(element.data);
                    }
                        break;

                    default:
                        break;
                }

            });
            this.copyToClipboard(JSON.stringify(result));
        },
        clearAll: function () {
            this.content.json = [];
        },
        copyToClipboard: async function (mytext) {
            try {
                await navigator.clipboard.writeText(mytext);
                alert('Copied');
            } catch (e) {
                alert(`Cannot copy ${e}`);
            }
        },
        addTextMessageTemplate: function () {
            console.log('send_text_message');
            let data = {
                id: generateUiid(),
                name: 'message-text-vue',
                data: {
                    messaging_type: "RESPONSE",
                    recipient: {
                        id: "{{User.id}}",
                    },
                    message: {
                        text: "Entre Un Message.",
                        quick_replies: [],
                        buttons: []
                    }
                }
            };
            this.$store.commit('pushJson', data);
        },
        addGenericTemplate: function () {
            console.log('send_generic_template');
            let data = {
                id: generateUiid(),
                name: 'generic-templates-vue',
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
                                elements: [
                                    {
                                        id: generateUiid(),
                                        title: "Title",
                                        image_url: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
                                        subtitle: "Subtitle",
                                        default_action: null,
                                        buttons: []
                                    }
                                ],
                            },
                        }
                    }
                }
            };
            this.$store.commit('pushJson', data);
        },
        deleteComponentId: function (id) {
            this.$store.commit('deleteTemplateId', id);
        }
    }
}
</script>

<template>
    <div>
        <div>
            <div class="d-flex justify-content-center align-items-stretch container">
                <!-- Menu, There is nothing special here. -->
                <div class="d-flex flex-column p-2 col-3 colone">
                    <div class="p-2 fb-opt-header">Facebook Responses</div>
                    <div class="text-center border bg-primary text-white rounded p-1">
                        Select to add a template
                    </div>
                    <div class="col-12 m-1"></div>
                    <div class="d-flex flex-column border justify-content-center align-items-center">
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border mt-1 items"
                            @click="addTextMessageTemplate">
                            Text + Button
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            File
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Image URL <br> Media Template
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Image ID
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Video URL <br> Media Template
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Video ID
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Audio
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items">
                            Delay
                        </div>
                        <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                            @click="addGenericTemplate">
                            Card Generic Template
                        </div>
                        <div class="col-10 mb-1 rounded bg-secondary text-white text-center border items">
                            Message From ID
                        </div>
                        <div class="col-12 m-2"></div>
                    </div>
                    <div class="row text-center justify-content-center">
                        <div class="col-5 m-1 rounded bg-secondary text-white items" @click="exportAll">Export</div>
                        <div class="col-5 m-1 rounded bg-secondary text-white items" @click="clearAll">Clear</div>
                    </div>
                </div>
                <div class="d-flex flex-column p-2 col-4 colone overflow-hidden">
                    <div class="p-2 fb-opt-header">Parameters Options</div>
                    <div class="display d-flex flex-column h-100 align-items-center">

                        <pre>{{ temporary }}</pre>

                        <!-- Looping Rendering here -- Begin -->
                        <div v-for="items in content.json" class="col-12">
                            <div class="d-flex flex-column justify-content-center">
                                <component :is="items.name" :id="items.id"></component>
                                <div class="btn border border-danger text-danger p-0 m-1"
                                    @click="deleteComponentId(items.id)">Delete Template</div>
                            </div>
                            <div class="separator"></div>
                        </div>
                        <!-- Looping Rendering here -- End   -->

                    </div>
                </div>
                <!-- Nous Ecoutons tout simplemetnt le $Store.state.content ici -->
                <div class="d-flex flex-column p-2 col-5 colone">
                    <div class="p-2 fb-opt-header">JSON Output</div>
                    <json-editor-vue :modelValue="content" class="h-100 overflow-hidden"></json-editor-vue>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.separator {
    height: 0.5em;
}

.items {
    cursor: pointer;
}

.items:active {
    background-color: #0d6efd !important;
}

.colone {
    border: 1px solid #ccc;
    margin: 2px;
    border-radius: 10px;
}

.container {
    height: 99vh;
    border: 1px solid #ccc;
}

.fb-opt-header {
    font-weight: bold;
    margin-bottom: 1em;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
}

.display {
    position: relative;
    overflow: scroll;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 10px;
}
</style>
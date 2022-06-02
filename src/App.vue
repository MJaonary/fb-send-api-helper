// TODO : forbide Creating a new item.

<script setup>
import JsonEditorVue from './components/jsonEditor.vue';
import messageTextVue from './components/messageText.vue';
</script>

<script>
export default {
    data() {
        return {
            content: {
                json: []
            },
            textMessages: [],
        }
    },
    watch: {
        textMessages: {
            handler() {

            },
            deep: true,
        }
    },
    methods: {
        textMessage: function () {
            console.log('send_text_message');
            let message_template = `{ "messaging_type": "RESPONSE", "recipient": { "id": "{{User.id}}" }, "message": { "text": "Bonjour {{User.name}}," } }`;
            this.content.json.push(JSON.parse(message_template));
        },
    },
}
</script>
<template>
    <div>
        <div class="d-flex justify-content-center align-items-stretch container">
            <div class="d-flex flex-column p-2 col-3 colone">
                <div class="p-2 fb-opt-header">Facebook Responses</div>
                <div class="text-center border bg-primary text-white rounded p-1">
                    Select to add a template
                </div>
                <div class="col-12 m-1"></div>
                <div class="d-flex flex-column border justify-content-center align-items-center">
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_text" @click="textMessage">
                        Text + Button
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_file_from_id">
                        File
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_image_media_url">
                        Image URL <br> Media Template
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_image_from_id">
                        Image ID
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_image_media_url">
                        Video URL <br> Media Template
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_image_from_id">
                        Video ID
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_audio_">
                        Audio
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_delay_from_id">
                        Delay
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_carousell">
                        Card Generic Template
                    </div>
                    <div class="col-10 mb-1 rounded bg-secondary text-white text-center border items"
                        data-role="send_ref_message_id">
                        Message From ID
                    </div>
                    <div class="col-12 m-2"></div>
                </div>
                <div class="row text-center justify-content-center">
                    <div class="col-5 m-1 rounded bg-secondary text-white functions">Copy</div>
                    <div class="col-5 m-1 rounded bg-secondary text-white functions">Clear</div>
                </div>
            </div>
            <div class="d-flex flex-column p-2 col-4 colone overflow-hidden">
                <div class="p-2 fb-opt-header">Parameters Options</div>
                <div class="display d-flex flex-column h-100 align-items-center">

                    <!-- Looping Rendering here -- Begin -->
                    <message-text-vue for></message-text-vue>
                    <!-- Looping Rendering here -- End   -->

                </div>
            </div>
            <div class="d-flex flex-column p-2 col-5 colone">
                <div class="p-2 fb-opt-header">JSON Output</div>
                <json-editor-vue v-model="content" class="h-100 overflow-hidden"></json-editor-vue>
            </div>
        </div>
    </div>
</template>

<style>
.items {
    cursor: pointer;
}

.functions,
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
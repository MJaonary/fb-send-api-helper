<script>
import jsonEditorVue from './components/jsonEditor.vue';
import jsonEditorSimpleVue from './components/jsonEditorSimple.vue';
import messageTextVue from './components/messageText.vue';
import genericTemplatesVue from './components/genericTemplates.vue'
import attachementUploaderVue from './components/attachementUploader.vue';
import mediaTemplateVue from './components/mediaTemplate.vue';
import fileSendVue from './components/fileSend.vue';
import personalizedElementsVue from './components/personalizedElements.vue';

import exporterFunctionsVue from './exporterFunctions.vue';
import elementsAdderVue from './elementsAdder.vue';

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            toogleMenu: 'main_menu',
            exported: {
                json: [],
            },
        }
    },
    components: {
        jsonEditorVue,
        jsonEditorSimpleVue,
        messageTextVue,
        genericTemplatesVue,
        attachementUploaderVue,
        mediaTemplateVue,
        fileSendVue,
        personalizedElementsVue
    },
    mixins: [ exporterFunctionsVue, elementsAdderVue ],
    computed: {
        ...mapGetters({
            content: 'getContent',
        })
    },
    methods: { 
        clearAll: function () {
            this.content.json = [];
        },
    }
}
</script>

<template>
    <div>
        <div class="d-flex flex-column border" style="position: absolute; height: 100%">
            <div class="btn border p-1 my-1" data-toggle="tooltip" data-placement="right" title="Main Menu"
                @click="toogleMenu = 'main_menu'">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-grid-fill" viewBox="0 0 16 16">
                    <path
                        d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                </svg>
            </div>
            <div class="btn border p-1 my-1" data-toggle="tooltip" data-placement="right" title="Attachment Uploader"
                @click="toogleMenu = 'attachment_uploader'">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-justify"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg>
            </div>
            <div class="btn border my-1 p-1" data-toggle="tooltip" data-placement="right" title="JSON Editor"
                @click="toogleMenu = 'json_editor';">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    class="bi bi-list-task" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                    <path
                        d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                    <path fill-rule="evenodd"
                        d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                </svg>
            </div>
        </div>

        <div v-if="toogleMenu == 'main_menu'"
            class="d-flex justify-content-center align-items-stretch container col-lg-12">
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
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addFile('file')">
                        File
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addMediaTemplate('image')">
                        Image URL <br> Media Template
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addFile('image')">
                        Image ID
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addMediaTemplate('video')">
                        Video URL <br> Media Template
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addFile('video')">
                        Video ID
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addFile('audio')">
                        Audio
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addGenericTemplate">
                        Card Generic Template
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addPersonalizedElements('pause')">
                        Pause
                    </div>
                    <div class="col-10 p-1 rounded bg-secondary text-white text-center border items"
                        @click="addPersonalizedElements('mid')">
                        Message From MID
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
            <!-- Nous Ecoutons tout simplemetnt le $store.state.content ici -->
            <div class="d-flex flex-column p-2 col-5 colone">
                <div class="p-2 fb-opt-header">JSON Output</div>
                <json-editor-vue :modelValue="content" class="h-100 overflow-hidden"></json-editor-vue>
            </div>
        </div>
    </div>

    <attachement-uploader-vue v-if="toogleMenu == 'attachment_uploader'"></attachement-uploader-vue>

    <div class="container" v-if="toogleMenu == 'json_editor'">
        <json-editor-simple-vue :model-value="exported" class="h-100 overflow-hidden"></json-editor-simple-vue>
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
<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    props: ['id', 'mid', 'eid'],
    data() {
        return {
            formEdit: true,
            payload: 'Default',
        }
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        }),
        message() {
            return this.content.json.find(item => item.id == this.mid);
        },
        elements() {
            return this.message.data.message.attachment.payload.elements;
        },
        element() {
            return this.elements.find(item => item.id == this.eid);
        },
        default_action() {
            return this.element.default_action;
        }
    },
    methods: {
        toogleButtonForm: function () {
            this.formEdit = !this.formEdit;
        },
        deleteDefaultAction: function () {
            let content = this.content;

            content.json.find(item => item.id == this.mid)
                .data.message.attachment.payload.elements
                .find(item => item.id == this.eid).default_action = null;
                
        },
        onFormChange: function (e) {
            let buttons = this.content.json.find(item => item.id == this.mid)
                .data.message.attachment.payload.elements
                .find(item => item.id == this.eid)
                .default_action;

            let value = e.target.value;

            switch (e.target.id) {
                case this.id + 'button-form-select':
                    buttons.type = value;
                    break;
                case this.id + 'button-form-webview-url':
                    buttons.url = value;
                    break;
                case this.id + 'button-form-webview-height':
                    buttons.webview_height_ratio = value;
                    break;
                case this.id + 'button-form-webview-messenger-extension':
                    buttons.messenger_extensions = value;
                    break;
                case this.id + 'button-form-webview-fallback-url':
                    buttons.fallback_url = value;
                    break;
                default:
                    break;
            }
            // this.$store.commit('updateContent', content);
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column align-items-center border rounded col-12">
        <div class="d-flex col-12">
            <div class="btn border mb-1 col-10" @click="toogleButtonForm">Default Action</div>
            <div class="d-flex align-items-center justify-content-center btn border col-2 mb-1 text-white bg-danger"
                @click="deleteDefaultAction">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path
                        d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
                </svg>
            </div>
        </div>

        <form class="border mb-1 col-12 rounded" :hidden="formEdit" @input="onFormChange">
            <div class="m-1">
                <div class="d-flex form-group m-1">
                    <label :for="id + 'button-form-url-type'" class="col-2 col-form-label">Type :</label>
                    <div class="col-10">
                        <input type="text" class="form-control" :id="id + 'button-form-url-type'" value="web_url"
                            disabled>
                    </div>
                </div>
                <div class="d-flex form-group m-1">
                    <label :for="id + 'button-form-webview-url'" class="col-2 col-form-label">Url :</label>
                    <div class="col-10">
                        <input type="text" class="form-control" :id="id + 'button-form-webview-url'" :value="default_action.url">
                    </div>
                </div>

                <div class="col-auto m-1">
                    <label class="mr-2" :for="id + 'button-form-webview-height'">webview_height_ratio</label>
                    <select class="form-select mr-2" :id="id + 'button-form-webview-height'">
                        <option value="compact" selected>Compact</option>
                        <option value="tall">Tall</option>
                        <option value="full">Full</option>
                    </select>
                </div>
                <div class="col-auto m-1">
                    <label class="mr-2"
                        :for="id + 'button-form-webview-messenger-extension'">messenger_extensions</label>
                    <select class="form-select mr-2" :id="id + 'button-form-webview-messenger-extension'">
                        <option value="true" selected>True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div class="d-flex form-group m-1">
                    <label :for="id + 'button-form-webview-fallback-url'" class="col-4 col-form-label">fallback_url
                        :</label>
                    <div class="col-8">
                        <input type="text" class="form-control" :id="id + 'button-form-webview-fallback-url'"
                            placeholder="Fallback Url">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="btn text-white bg-secondary p-0 m-1 col-12" @click="toogleButtonForm">
                    Options
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
* {
    font-size: small;
}

.btn:active {
    background-color: #004cd0c5 !important;
    color: white !important;
}
</style>
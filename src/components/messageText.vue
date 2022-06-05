<script>
import buttonVue from './button.vue';
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    components: {
        buttonVue,
        quickReplyVue
    },
    props: ['id'],
    data() {
        return {
            hideButtonAdder: true,
            hideQuickReplyAdder: true,
        }
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        }),
        message() {
            return this.content.json.find(item => item.id == this.id);
        },
        buttons() {
            return this.message?.data.message?.buttons;
        },
        quick_replies() {
            return this.message?.data.message?.quick_replies;
        }
    },
    watch: {
        buttons: {
            handler(buttons) {
                if (buttons?.length > 2) {
                    this.hideButtonAdder = false;
                } else {
                    this.hideButtonAdder = true;
                }
            },
            deep: true
        },
        quick_replies: {
            handler(quick_replies) {
                if (quick_replies?.length > 12) {
                    this.hideQuickReplyAdder = false;
                } else {
                    this.hideQuickReplyAdder = true;
                }
            },
            deep: true
        },
    },
    methods: {
        updateMessage: function(e) {
          let content = this.content;
          content.json.find(item => item.id == this.id).data.message.text = e.target.innerText;
        },
        addButton: function () {
            let uuid = generateUiid();
            let button = {
                id: uuid,
                type: 'postback',
                title: 'Button',
                payload: 'Default_Payload',
                url: 'https://example.com',
                webview_height_ratio: 'compact',
                messenger_extensions: 'true',
                fallback_url: '',
            };
            this.buttons.push(button);
            // this.$store.commit('updateContent', this.content); // So we can push and pop an array, but we cant edit it.
        },
        addQuickReply: function () {
            let uuid = generateUiid();
            let quick_reply = {
                id: uuid,
                content_type: 'text',
                title: 'Quick Reply',
                payload: 'Default_Payload',
                image_url: '',
            };
            this.quick_replies.push(quick_reply);
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column border border-primary rounded col-12">
        <div class="bubble" :class="{ 'with-buttons': (buttons?.length) }" contenteditable @input="updateMessage">
            {{ message.data?.message?.text }}
        </div>
        <!-- <button-vue v-for="item in buttons" :id="item" @onRequestDeleteButton="RequestDeleteButton"
            @buttonInput="buttonInput"></button-vue> -->
        <button-vue v-for="button in buttons" :id="button.id" :mid="id">
        </button-vue>
        <div class="btn border m-0 p-0 bg-primary text-white" @click="addButton" :hidden="!hideButtonAdder">
            <div class="d-flex align-items-center justify-content-center btn border bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-plus-circle m-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <div>Add Button</div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="d-flex flex-column align-items-center">
                <quick-reply-vue v-for="quick_reply in quick_replies" :id="quick_reply.id" :mid="id"></quick-reply-vue>
            </div>
        </div>
        <div class="btn border m-0 p-0 bg-primary text-white container-fluid" @click="addQuickReply"
            :hidden="!hideQuickReplyAdder">
            <div
                class="d-flex align-items-center justify-content-center btn border bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-plus-circle m-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <div>Quick Reply</div>
            </div>
        </div>
    </div>
</template>

<style>
.bubble {
    white-space: pre-wrap;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    color: rgba(0, 0, 0, 1);
    margin: 1px;
    padding: 6px 12px;
    box-sizing: border-box;
    clear: left;
    word-wrap: break-word;
    display: inline-block;
    border-radius: 1em;
    -webkit-appearance: textarea;
}

.bubble.with-buttons {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;
}

.btn:active {
    background-color: #004cd0c5 !important;
    color: white !important;
}
</style>
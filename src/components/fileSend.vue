<script>
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    components: {
        quickReplyVue
    },
    props: ['id'],
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        }),
        message() {
            return this.content.json.find(item => item.id == this.id);
        },
        quick_replies() {
            return this.message?.data.message?.quick_replies;
        }
    },
    methods: {
        updateAttachmentId: function (e) {
            //   let content = this.content;
            this.content.json.find(item => item.id == this.id).data.message.attachment.payload.attachment_id = e.target.value;
        },
        addQuickReply: function () {
            let quick_reply = {
                id: generateUiid(),
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
    <label> Paste {{ message.data.message.attachment.type }} attachment_id here :</label>
    <div class="d-flex flex-column border border-primary rounded col-12 px-1">
        <input type="text" class="bubble" :value="message.data.message.attachment.payload.attachment_id"
            @input="updateAttachmentId">
    </div>
    <div class="container-fluid">
        <div class="d-flex flex-column align-items-center">
            <quick-reply-vue v-for="quick_reply in quick_replies" :id="quick_reply.id" :mid="id"></quick-reply-vue>
        </div>
    </div>
    <div class="btn border m-0 p-0 bg-primary text-white container-fluid" @click="addQuickReply"
        :hidden="quick_replies?.length > 12">
        <div class="d-flex align-items-center justify-content-center btn border bg-primary text-white ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-plus-circle m-1" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <div>Quick Reply</div>
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

.quick-reply-container:focus {
    outline: none;
}

.quick-replies {
    text-align: center;
    padding-bottom: 10px;
    white-space: nowrap;
    line-height: 2em;
    overflow-x: auto;
}

.quick-replies .button {
    background: #fdfdfd;
    color: #0084ff;
    padding: 5px 10px;
    cursor: pointer;
    display: inline;
    border: 1px solid #afafaf;
    border-radius: 1em;
    margin: 5px;
}

.quick-reply-button,
.quick-reply-input {
    background: #fff;
    border-radius: 1em;
    color: #0084ff;
    display: inline-block;
    border: 1px solid #0084ff;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
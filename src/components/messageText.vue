<script setup>
import buttonVue from './button.vue';
import quickReplyVue from './quickReply.vue';
import { generateUiid } from './utils/generateuuids';
</script>

<template>
    <div class="d-flex flex-column border border-primary rounded col-12">
        <div class="bubble" :class="{ 'with-buttons': (buttons.length) }" contenteditable>
            Enter your message
        </div>
        <button-vue v-for="item in buttons" :id="item" @onRequestDeleteButton="RequestDeleteButton" @buttonInput="buttonInput"></button-vue>
        <div class="d-flex justify-content-center border">
            <div class="btn border bg-primary text-white col-6" @click="addButton" :hidden="!hideButtonAdder">
                Add Btn
            </div>
            <div class="btn border bg-danger text-white col-6" @click="removeButton">
                POP Btn
            </div>
        </div>
        <div class="container-fluid">
            <div class="d-flex flex-column align-items-center quick-reply-container">
                <quick-reply-vue v-for="item in quickreplies"></quick-reply-vue>
            </div>
        </div>
        <div class="d-flex justify-content-center border">
            <div class="btn border bg-primary text-white col-6" @click="addQuickReply" :hidden="!hideQuickReplyAdder">
                Add QR
            </div>
            <div class="btn border bg-danger text-white col-6" @click="removeQuickReply">
                Pop QR
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hideButtonAdder: true,
            hideQuickReplyAdder: true,
            buttons: [],
            quickreplies: [],
        }
    },
    watch: {
        buttons: {
            handler(button) {
                if (button.length > 4) {
                    this.hideButtonAdder = false;
                } else {
                    this.hideButtonAdder = true;
                }
            },
            deep: true
        },
        quickreplies: {
            handler(quickreply) {
                if (quickreply.length > 12) {
                    this.hideQuickReplyAdder = false;
                } else {
                    this.hideQuickReplyAdder = true;
                }
            },
            deep: true
        },
    },
    methods: {
        RequestDeleteButton: function (id) {
            console.log(this.buttons);
            console.log(`Request delete button${id}`);
            this.buttons = this.buttons.filter(item => { return item != id })
            console.log(this.buttons);
        },
        addButton: function () {
            let uuid = generateUiid();
            this.buttons.push(uuid);
        },
        buttonInput: function(e) {
            console.log(e);
        },
        addQuickReply: function () {
            let uuid = generateUiid();
            this.quickreplies.push(uuid);
        },
        removeButton() {
            this.buttons.pop();
        },
        removeQuickReply() {
            this.quickreplies.pop();
        }
    }
}
</script>
<style>
.bubble {
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
<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    props: ['id', 'mid'],
    data() {
        return {
            formEdit: true,
            selectedMode: 'text'
        }
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        }),
        message() {
            return this.content.json.find(item => item.id == this.mid);
        },
        quick_replies() {
            return this.message.data.message.quick_replies;
        },
        quick_reply() {
            return this.quick_replies.find(item => item.id == this.id);
        },
    },
    methods: {
        toogleButtonForm: function () {
            this.formEdit = !this.formEdit;
        },
        deleteQuickReply: function () {
            // let content = this.content;
            let quick_replies = _.reject(this.quick_replies, e => { return e.id == this.id });
            this.content.json.find(item => item.id == this.mid).data.message.quick_replies = quick_replies;
            // this.$store.commit('updateContent', content);
        },
        onFormChange: function (e) {
            console.log(e.target.id);
            let content = this.content;
            let value = e.target.value;
            switch (e.target.id) {
                case this.id + 'quick-reply-form-content-type':
                    content.json.find(item => item.id == this.mid).data.message.quick_replies.find(item => item.id == this.id).messenger_extensions = value;
                    break;
                case this.id + 'quick-reply-form-postback-title':
                    content.json.find(item => item.id == this.mid).data.message.quick_replies.find(item => item.id == this.id).title = value;
                    break;
                case this.id + 'quick-reply-form-postback-payload':
                    content.json.find(item => item.id == this.mid).data.message.quick_replies.find(item => item.id == this.id).payload = value;
                    break;
                case this.id + 'quick-reply-form-postback-image-url':
                    content.json.find(item => item.id == this.mid).data.message.quick_replies.find(item => item.id == this.id).image_url = value;
                    break;
                default:
                    break;
            }
            this.$store.commit('updateContent', content);
        }
    },
}
</script>

<template>
    <div class="d-flex flex-column m-1 p-0 align-items-center border rounded col-12 quick-reply-button">
        <div class="d-flex col-12">
            <div class="btn border m-0 col-10" @click="toogleButtonForm">
                {{ quick_reply.title }}
            </div>
            <div class="d-flex align-items-center justify-content-center btn border col-2 text-white bg-danger fa-lg"
                @click="deleteQuickReply">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path
                        d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
                </svg>
            </div>
        </div>
    </div>
    <form class="border my-1 py-1 rounded" :hidden="formEdit" @input="onFormChange">
        <div class="col-auto m-1">
            <label class="mr-2" :for="id + 'quick-reply-form-content-type'">Content_type :</label>
            <select class="form-select mr-2" :id="id + 'quick-reply-form-content-type'" v-model="selectedMode">
                <option value="text" selected>Text</option>
            </select>
        </div>
        <div class="d-flex form-group m-1">
            <label :for="id + 'quick-reply-form-postback-title'" class="col-3 col-form-label">Title :</label>
            <div class="col-9">
                <input type="text" class="form-control" :id="id + 'quick-reply-form-postback-title'"
                    :value="quick_reply.title">
            </div>
        </div>
        <div class="d-flex form-group m-1">
            <label :for="id + 'quick-reply-form-postback-payload'" class="col-3 col-form-label">Payload : </label>
            <div class="col-9">
                <input type="text" class="form-control" :id="id + 'quick-reply-form-postback-payload'"
                    :value="quick_reply.payload">
            </div>
        </div>
        <div class="d-flex form-group m-1">
            <label :for="id + 'quick-reply-form-postback-image-url'" class="col-3 col-form-label">Image-url : </label>
            <div class="col-9">
                <input type="text" class="form-control" :id="id + 'quick-reply-form-postback-image-url'"
                    :value="quick_reply.image_url">
            </div>
        </div>
        <div class="btn text-white bg-secondary p-0 col-12" @click="formEdit = true">
            Hide options
        </div>
    </form>
</template>

<style scoped>
* {
    font-size: small;
}

.quick-reply-button {
    background: #fff;
    border-radius: 1em;
    color: #0084ff !important;
    display: inline-block;
    border: 1px solid #0084ff !important;
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
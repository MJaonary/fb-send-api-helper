<template>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-interval="false" style="width: 100%;">
        <div class="carousel-inner">
            <!-- :class="{'active':(index==(elements.length-1))}" -->
            <template-vue v-for="(element, index) in elements" :id="element.id" :mid="id" :index="index" :class="{'active':(index==(elements.length-1))}">
            </template-vue>

            <a class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>

        <div class="btn border mt-1 p-0 bg-primary text-white col-12" @click="addElement" :hidden="elements.length>9">
            <div class="d-flex align-items-center justify-content-center btn border bg-primary text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-plus-circle m-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <div>Add Element</div>
            </div>
        </div>

        <div class="quick-reply-container d-flex flex-column">
            <div class="d-flex flex-column align-items-center">
                <quick-reply-vue v-for="quick_reply in quick_replies" :id="quick_reply.id" :mid="id"></quick-reply-vue>
            </div>
            <div class="btn border m-0 p-0 bg-primary text-white container-fluid" @click="addQuickReply"
                :hidden="quick_replies.length>12">
                <div class="d-flex align-items-center justify-content-center btn border bg-primary text-white">
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
    </div>
</template>

<script>
import templateVue from './template.vue';
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    components: {
        quickReplyVue,
        templateVue
    },
    props: ['id'],
    data() {
        return {
            hideButtonAdder: true,
            hideQuickReplyAdder: true,
            hideElementAdder: true,
        }
    },
    computed: {
        ...mapGetters({
            content: 'getContent',
        }),
        message() {
            return this.content.json.find(item => item.id == this.id);
        },
        elements() {
            return this.message?.data.message.attachment.payload.elements;
        },
        quick_replies() {
            return this.message?.data.message?.quick_replies;
        }
    },
    methods: {
        updateMessage: function (e) {
            let content = this.content;
            content.json.find(item => item.id == this.id).data.message.text = e.target.innerText;
        },
        addElement: function () {
            let element = {
                id: generateUiid(),
                title: "Title",
                image_url: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
                subtitle: "Subtitle",
                default_action: null,
                buttons: []
            }
            this.elements.push(element);
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

<style scoped>
.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
    background-color: rgba(12, 105, 235, 0.827);
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
}

.carousel-control-prev-icon:active,
.carousel-control-next-icon:active {
    background-color: rgb(13, 100, 222);
}

/* Centered text */
.centered {
    font-weight: bold;
    color: rgb(9, 7, 7);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.templates-input,
.templates-input:focus {
    outline: none;
    border: none;
    background: transparent;
    color: black;
}

.buttons {
    cursor: pointer;
    margin: 0px 1px 1px 1px;
    border: 1px solid #e5e5e5;
    text-align: center;
    line-height: 2em;
}

.buttons:active {
    background-color: #ccc;
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
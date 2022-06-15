<script>
import templateVue from './template.vue';
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    components: {
        quickReplyVue,
        templateVue,
    },
    props: ['id'],
    data() {
        return {
            // Workaround about incompatibility between vue v-for and bootstrap carousel active class 
            // There are two handler for the bootstrap carousel slide,
            // We need to activate the first element of it only once.
            activated: 0, // The simple solution is to handle it ourselves.
            imageSquared: false,
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
            this.activated = this.elements.length;
            console.log(this.activated);
            let element = {
                id: generateUiid(),
                title: "Title",
                image_url: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", // Default Image template.
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
        },
        next: function () {
            console.log('next');
            this.activated++;
            if (this.activated > (this.elements.length - 1)) {
                this.activated = 0;
            }
        },
        prev: function () {
            console.log('prev');
            this.activated--;
            if (this.activated < 0) {
                this.activated = (this.elements.length - 1);
            }
        },
        onDeleteElement(index) {
            if (index == 0) {
                this.activated = this.elements.length - 2;
            } else {
                this.activated = index - 1;
            }
        },
        image_aspect_ratio() {
            this.message.data.message.attachment.payload.image_aspect_ratio = this.imageSquared ? "square" : "horizontal";
        }
    }
}
</script>

<template>
    <div class="carousel slide" data-bs-interval="false" style="width: 100%;">

        <div class="carousel-inner">
            <!-- :class="{'active':(index==(elements.length-1))}" -->
            <template-vue v-for="(element, index) in elements" :id="element.id" :mid="id" :index="index"
                :class="{ 'active': (index == activated) }" @onDeleteElement="onDeleteElement">
            </template-vue>

            <a class="carousel-control-prev" type="button" data-bs-slide="prev" @click="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" type="button" data-bs-slide="next" @click="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </a>
        </div>

        <div class="btn border mt-1 p-0 bg-primary text-white col-12" @click="addElement" :hidden="elements.length > 9">
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
                :hidden="quick_replies.length > 12">
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
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="false" id="checkImageSquared" v-model="imageSquared" @change="image_aspect_ratio">
        <label class="form-check-label" for="checkImageSquared">
            Image Aspect Ratio Squared
        </label>
    </div>
</template>

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

.quick-reply-container:focus {
    outline: none;
}
</style>
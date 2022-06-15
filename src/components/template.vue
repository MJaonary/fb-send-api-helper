<script>
import buttonVue from './buttonDepth2.vue';
import defaultActionVue from './defaultAction.vue';
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    components: {
        buttonVue,
        quickReplyVue,
        defaultActionVue
    },
    props: ['id', 'mid', 'index', 'class'],
    emits: ['onDeleteElement'],
    data() {
        return {
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
            return this.message?.data.message.attachment.payload.elements;
        },
        element() {
            return this.elements.find(item => item.id == this.id);
        },
        buttons() {
            return this.element.buttons;
        },
        default_action() {
            return this.element.default_action;
        }
    },
    methods: {
        elementInput: function (e) {
            // console.log(e.target.id);
            let element = this.element;
            switch (e.target.id) {
                case this.id + '-input-image_url':
                    element.image_url = e.target.value;
                    break;
                case this.id + '-input-title':
                    element.title = e.target.value;
                    break;
                case this.id + '-input-subtitle':
                    element.subtitle = e.target.value;
                    break;
                default:
                    break;
            }
        },
        addButton: function () {
            let button = {
                id: generateUiid(),
                type: 'postback',
                title: 'Button',
                payload: 'Default_Payload',
                url: 'https://example.com',
                webview_height_ratio: 'compact',
                messenger_extensions: 'true',
                fallback_url: '',
            };
            this.buttons.push(button);
            // this.$store.commit('updateContent', this.content); 
            // So we can 'push' and 'pop' an array, but we cant edit it.
        },
        deleteElement: function (id) {
            // console.log(this.index);
            this.$emit('onDeleteElement', this.index);
            // this.elements = this.elements.filter(item => { return item.id != id });
            this.content.json.find(item => item.id == this.mid)
                .data.message.attachment.payload.elements = this.elements.filter(item => { return item.id != id });
            // this.$store.commit('updateContent', content);
        },
        addDefaultAction: function () {
            let default_action = {
                type: 'web_url',
                url: 'https://example.com',
                webview_height_ratio: 'compact',
                messenger_extensions: 'true',
                fallback_url: '',
            }
            this.element.default_action = default_action;
        }
    }
}
</script>

<template>
    <div class="carousel-item border border-primary px-1 rounded" :class="class">
        <div class="d-flex flex-column border rounded" @input="elementInput">
            <div class="border" style="position: relative">
                <img :src="element.image_url || 'https://mdbcdn.b-cdn.net/img/new/slides/043.webp'"
                    class="d-block w-100" alt="Exotic Fruits" style="width: 100%;height:9rem;object-fit: contain;" />
                <div class="index-container d-flex flex-column align-items-center">
                    <h2>
                        {{ index }}
                    </h2>
                    <h2
                        style="left:0; background-color: red;color:white; border-radius: 50%; width: 1em; display: flex; justify-content: center;">
                        {{ (elements.length - 1) }}
                    </h2>
                </div>
                <input :id="id + '-input-image_url'" type="text" class="text-center centered templates-input"
                    placeholder="Paste Url Here" :value="element.image_url">
                <input :id="id + '-input-title'" type="text" class="text-center col-12" placeholder="Title"
                    :value="element.title">
                <input :id="id + '-input-subtitle'" type="text" class="text-center mt-1 col-12" placeholder="Subtitle"
                    :value="element.subtitle">
            </div>

            <default-action-vue v-if="default_action" :id="123456789" :mid="mid" :eid="id"></default-action-vue>
            <div class="btn border m-0 p-0 bg-primary text-white" @click="addDefaultAction" :hidden="default_action">
                <div class="d-flex align-items-center justify-content-center btn border bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus-circle m-1" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <div>Add Default action</div>
                </div>
            </div>

            <button-vue v-for="button in buttons" :id="button.id" :mid="mid" :eid="id"></button-vue>
            <div class="btn border m-0 p-0 bg-primary text-white" @click="addButton" :hidden="buttons.length > 2">
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

            <div class="d-flex justify-content-center">
                <div class="btn border border-danger text-danger p-0 m-1 col-12" :hidden="elements.length == 1"
                    @click="deleteElement(id)">
                    Delete Element Number: {{ index }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.index-container {
    opacity: 25%;
    position: absolute;
    right: 0;
    top: 15%;
    border: 1px solid black;
    border-radius: 50%;
    width: 10%;
    display: flex;
    justify-content: center;
}

.carousel-control-next,
.carousel-control-prev {
    z-index: -1 !important;
    height: 10rem !important;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
    background-color: rgba(13, 100, 222, 0.699);
    height: 10rem;
}

.carousel-control-prev-icon:active,
.carousel-control-next-icon:active {
    background-color: rgb(13, 100, 222);
    height: 10rem;
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
</style>
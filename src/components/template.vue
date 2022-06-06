<template>
    <div class="carousel-item border border-primary px-1 rounded" :class="class">
        <div class="d-flex flex-column border rounded">
            <div class="image-container border" style="position: relative;">
                <img src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp" class="d-block w-100" alt="Exotic Fruits" />
                <h2>
                    {{ index }}
                </h2>
                <input type="text" class="text-center centered templates-input" placeholder="Paste Url Here">
                <input type="text" class="text-center col-12" placeholder="Title">
                <input type="text" class="text-center mt-1 col-12" placeholder="Subtitle">
            </div>

            <div class="btn border m-0 p-0 bg-primary text-white" @click="">
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
                    Delete Element
                </div>
            </div>
        </div>
    </div>

    <a class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </a>
</template>

<script>
import buttonVue from './buttonDepth2.vue';
import quickReplyVue from './quickReply.vue';

import { mapGetters } from 'vuex';
import { generateUiid } from './utils/generateuuids';

export default {
    emits: ['onDeleteElement'],
    components: {
        buttonVue,
        quickReplyVue
    },
    props: ['id', 'mid', 'index', 'class'],
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
        }
    },
    methods: {
        updateMessage: function (e) {
            let content = this.content;
            content.json.find(item => item.id == this.id).data.message.text = e.target.innerText;
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
            this.$emit('onDeleteElement');
            console.log('deleteElement');
            let content = this.content;

            let elements = content.json.find(item => item.id == this.mid)
                .data.message.attachment.payload.elements.filter(item => {
                    console.log(item.id);
                    return item.id != id
                })

            content.json.find(item => item.id == this.mid)
                .data.message.attachment.payload.elements = elements;

            this.$store.commit('updateContent', content);
        }
    }
}
</script>

<style scoped>
h2 {
    opacity: 25%;
    position: absolute;
    right: 0;
    top: 0;
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
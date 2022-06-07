import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// 🤺

const store = createStore({
    state() {
        return {
            content: {
                json: [],
            },
        }
    },
    getters: {
        getContent(state) {
            return state.content;
        }
    },
    mutations: {
        updateContent(state, newContent) {
            state.content = newContent;
        },
        pushJson(state, data) {
            state.content.json.push(data);
        },
        deleteTemplateId(state, id) {
            state.content.json = state.content.json.filter(item => {
                console.log(item.id);
                return item.id != id
            })
        },
    }
})

createApp(App).use(store).mount('#app')
import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore({
    state() {
        return {
            content: {
                json: [],
            },
            history: [],
            page_access_token: '',
            file_type: 'file',
        }
    },
    getters: {
        getContent(state) {
            return state.content;
        },
        getHistory(state) {
            return state.history;
        },
        getLatestPageAccessToken(state) {
            return state.page_access_token;
        },
        getLatestFileType(state) {
            return state.file_type;
        }
    },
    mutations: {
        updatePageAccessToken(state, newContent) {
            state.page_access_token = newContent;
        },
        updateFileType(state, newContent) {
            state.file_type = newContent;
        },
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
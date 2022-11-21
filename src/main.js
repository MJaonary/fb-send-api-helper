import { createApp } from "vue";
import { createStore } from "vuex"; // Vuex is the store used here

import App from "./App.vue";

// Use bootstrap with VueJs for styling
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore({
  state() {
    return {
      content: {
        json: [],
      },
      history: [],
      file_type: "file",
      FB_page_access_token: "",
      FB_user_psid: "",
    };
  },
  getters: {
    getContent(state) {
      return state.content;
    },
    getHistory(state) {
      return state.history;
    },
    getLatestFileType(state) {
      return state.file_type;
    },
    getLatestPageAccessToken(state) {
      return state.FB_page_access_token;
    },
    getUserPsid(state) {
      return state.FB_user_psid;
    },
  },
  mutations: {
    updateContent(state, content) {
      state.content = {
        ...content,
      };
    },
    pushJson(state, data) {
      state.content.json = [...state.content.json, data];
    },
    deleteTemplateId(state, id) {
      state.content.json = state.content.json.filter((item) => {
        return item.id != id;
      });
    },
    updateFileType(state, fileType) {
      state.file_type = fileType;
    },
    updatePageAccessToken(state, FBaccessToken) {
      state.FB_page_access_token = FBaccessToken;
    },
    updateUserPsid(state, FBPsid) {
      state.FB_user_psid = FBPsid;
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");

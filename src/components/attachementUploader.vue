<script>
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedMode: 'send_from_url',
            file_url: '',
            file: null,
            not_reusable: false,
            response: null,
            showHistory: false,
        }
    },
    computed: {
        ...mapGetters({
            history: 'getHistory',
            page_access_token: 'getLatestPageAccessToken',
            file_type: 'getLatestFileType',
        }),
    },
    methods: {
        fileInput: function () {
            this.file = this.$refs.fileInput;
        },
        modifyLatestAccessToken: function () {
            this.$store.commit('updatePageAccessToken', this.$refs.page_access_token_input.value);
        },
        modifyLatestFileType: function () {
            this.$store.commit('updateFileType', this.$refs.file_type_input.value);
        },
        sendRequest: async function () {
            console.log('Request for getting attachment id'); // TODO Show an animation
            if (this.selectedMode == 'send_from_url') {
                let data = {
                    message: {
                        attachment: {
                            type: this.$refs.file_type_input.value,
                            payload: {
                                url: this.file_url,
                                is_reusable: !this.not_reusable
                            }
                        }
                    }
                };
                try {
                    this.response = await axios.request({
                        url: "https://graph.facebook.com/v13.0/me/message_attachments/",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "post",
                        params: {
                            access_token: this.page_access_token,
                        },
                        data: data,
                    });

                    if (this.response.status == 200) {
                        alert('Message Sent, returning attachement ID');
                        this.history.push({
                            url: this.file_url,
                            type: this.$refs.file_type_input.value,
                            response: this.response.data,
                            is_reusable: !this.not_reusable
                        })
                    } else {
                        alert('There was an error while attaching the file');
                    }
                } catch (error) {
                    alert(`Error while Uploading file from URL ${error}`);
                }

            } else if (this.selectedMode == 'send_from_file') {
                const formData = new FormData();
                try {
                    formData.append('message', `{"attachment":{"type":"${this.$refs.file_type_input.value}", "payload":{"is_reusable":${!this.not_reusable ? 'true' : 'false'}}}}`);
                    formData.append('file', this.file.files[0]);
                    this.response = await axios.post(`https://graph.facebook.com/v14.0/me/message_attachments/`,
                        formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        params: {
                            access_token: this.page_access_token,
                        },
                    })
                    if (this.response.status == 200) {
                        alert('Message Sent, returning attachement ID');
                        this.history.push({
                            path: this.file.value,
                            type: this.$refs.file_type_input.value,
                            response: this.response.data,
                            is_reusable: !this.not_reusable
                        })
                    } else {
                        alert('There was an error while attaching the file');
                    }
                } catch (error) {
                    if (error.name == 'TypeError') {
                        alert('You must specify one file to upload. Otherwise It will not work.');
                    } else if (error.name == 'AxiosError') {
                        alert('The Page Access token field is Mandatory.');
                    } else {
                        alert(`Error while Uploading file from FILE ${error.name}`);
                    }
                }
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column col-lg-8">
        <div class="bg-primary text-light text-center p-2 rounded">
            <div class="navbar-brand p-1">
                <h2>Attachement Uploader</h2>
            </div>
        </div>
        <div class="border p-2 mt-2">
            <h3>Upload from : {{ selectedMode }}</h3>
            <form>
                <div class="form-group">
                    <select class="form-control" v-model="selectedMode">
                        <option value="send_from_url">Upload From URL</option>
                        <option value="send_from_file">Drag and Drop File</option>
                    </select>
                </div>
            </form>
        </div>

        <div class="border border-primary mt-2 p-2">
            <div v-if="selectedMode == 'send_from_url'">
                <form>
                    <div class="form-group">
                        <label for="file_url">Enter The url of the file to send here :</label>
                        <input type="email" class="form-control" id="file_url" placeholder="Paste file URL Here"
                            v-model="file_url">
                    </div>
                </form>
            </div>
            <div v-if="selectedMode == 'send_from_file'" class="border rounded">
                <div class="file-drop-area">
                    <span class="choose-file-button btn border-secondary">Choose files</span>
                    <span class="file-message">or drag and drop files here</span>
                    <input ref="fileInput" class="file-input" type="file" @change="fileInput">
                </div>
                <div v-if="file?.value" class="border m-2 p-2 rounded">{{ file?.value }}</div>
            </div>
        </div>

        <div class="border mt-2 p-2">
            <form>
                <div class="form-group">
                    <label for="page_access_token">Enter your Page Access Token here :</label>
                    <input type="text" class="form-control" id="page_access_token" ref="page_access_token_input"
                        :value="page_access_token" @input="modifyLatestAccessToken">
                </div>
                <div class="form-group">
                    <label for="fileType">Select the type of the element</label>
                    <select class="form-control" id="fileType" ref="file_type_input" :value="file_type"
                        @change="modifyLatestFileType">
                        <option value="file">File</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="attachmentReuse" v-model="not_reusable">
                    <label class="form-check-label" for="attachmentReuse">Not Reusable</label>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" @click.prevent="sendRequest">Upload
                        Attachement</button>
                </div>
            </form>
        </div>

        <div class="border mt-2 p-2">
            <pre>{{ response?.data }}</pre>
        </div>

        <div class="d-flex justify-content-center">
            <div class="btn border m-1" @click="showHistory = !showHistory">Show history</div>
        </div>
    </div>

    <div v-if="showHistory" class="border mt-2 p-2">
        <h3>History</h3>
        <pre>{{ history }}</pre>
    </div>

</template>

<style>
.file-drop-area {
    position: relative;
    display: flex;
    align-items: center;
    width: 450px;
    max-width: 100%;
    padding: 25px;
    border: 1px dashed rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    transition: 0.2s;

}

.choose-file-button {
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    padding: 8px 15px;
    margin-right: 10px;
    font-size: 12px;
    text-transform: uppercase;
}

.file-message {
    font-size: small;
    font-weight: 300;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;

}
</style>
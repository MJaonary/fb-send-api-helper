<template>
    <div class="d-flex flex-column align-items-center button-container col-12">
        <div class="btn border col-12 mb-1" @click="toogleButtonForm">
        {{ title }} > {{ id }}
        </div>

        <form class="border mb-1 rounded" :hidden="formEdit">
            <div class="col-auto m-1">
                <label class="mr-2" for="button-form-select">Preferences</label>
                <select class="form-select mr-2" id="button-form-select" v-model="selectedMode" @input="oninput">
                    <option value="postback" selected>Postback</option>
                    <option value="web_url">Web url</option>
                </select>
            </div>

            <div :hidden="!(selectedMode == 'postback')">
                <div class="d-flex form-group m-1">
                    <label for="button-form-postback-type" class="col-3 col-form-label">Type :</label>
                    <div class="col-9">
                        <input type="text" class="form-control" id="button-form-postback-type" value="postback"
                            disabled>
                    </div>
                </div>
                <div class="d-flex form-group m-1">
                    <label for="button-form-postback-title" class="col-3 col-form-label">Title :</label>
                    <div class="col-9">
                        <input type="text" class="form-control" id="button-form-postback-title" v-model="title" @input="oninput">
                    </div>
                </div>
                <div class="d-flex form-group m-1">
                    <label for="button-form-postback-payload" class="col-3 col-form-label">payload : </label>
                    <div class="col-9">
                        <input type="text" class="form-control" id="button-form-postback-payload"
                            placeholder="Default" v-model="payload" @input="oninput">
                    </div>
                </div>
            </div>

            <div class="m-1" :hidden="!(selectedMode == 'web_url')">
                <div class="d-flex form-group m-1">
                    <label for="button-form-url-type" class="col-2 col-form-label">Type :</label>
                    <div class="col-10">
                        <input type="text" class="form-control" id="button-form-url-type" value="web_url" disabled>
                    </div>
                </div>
                <div class="d-flex form-group m-1">
                    <label for="button-form-url" class="col-2 col-form-label">Url :</label>
                    <div class="col-10">
                        <input type="text" class="form-control" id="button-form-url" v-model="url" @input="oninput" placeholder="Enter link">
                    </div>
                </div>
                <div class="d-flex form-group m-1">
                    <label for="button-form-url-title" class="col-2 col-form-label">Title :</label>
                    <div class="col-10">
                        <input type="text" class="form-control" id="button-form-url-title" placeholder="View Website"
                            v-model="title" @input="oninput">
                    </div>
                </div>
                <div class="col-auto m-1">
                    <label class="mr-2" for="button-form-select">webview_height_ratio</label>
                    <select class="form-select mr-2" id="button-form-webview-height" v-model="webview_height_ratio" @input="oninput">
                        <option value="compact" selected>Compact</option>
                        <option value="tall">Tall</option>
                        <option value="full">Full</option>
                    </select>
                </div>
                <div class="col-auto m-1">
                    <label class="mr-2" for="button-form-select">messenger_extensions</label>
                    <select class="form-select mr-2" id="button-form-messenger-extension" v-model="messenger_extensions" @input="oninput">
                        <option value="true" selected>True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div class="d-flex form-group m-1">
                    <label for="button-form-url" class="col-4 col-form-label">fallback_url :</label>
                    <div class="col-8">
                        <input type="text" class="form-control" id="button-form-url" v-model="fallback_url" placeholder="Fallback Url" @input="oninput">
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="btn text-white bg-secondary p-0 m-1 col-4" @click="formEdit = true">
                    Options
                </div>
                <div class="btn text-white bg-danger p-0 m-1 col-4" @click="$emit('onRequestDeleteButton', id)">
                    Delete
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props: [
        'id'
    ],
    data() {
        return {
            selectedMode: 'postback', // Default Mode Postback
            url:'',
            title:'Button',
            webview_height_ratio:'full',
            messenger_extensions:'true',
            fallback_url:'',
            payload:'Default',
            formEdit: true,
        }
    },
    methods: {
        toogleButtonForm: function (e) {
            this.formEdit = !this.formEdit;
            this.oninput(e);
        },
        oninput: function(e) {
            console.log(e.target.id);
            if ( e.target.id == 'button-form-select' ) {
                this.selectedMode = e.target.value; // The is an error of sync so we have to catch it first.
                console.log(this.selectedMode);
            }

            if ( e.target.id == 'button-form-webview-height' ) {
                this.webview_height_ratio = e.target.value; // The is an error of sync so we have to catch it first.
                console.log(this.selectedMode);
            }

            if ( e.target.id == 'button-form-messenger-extension' ) {
                this.messenger_extensions = e.target.value; // The is an error of sync so we have to catch it first.
                console.log(this.selectedMode);
            }

            let button = {};

            if ( this.selectedMode == 'postback' ) {
                button.type = 'postback';
                button.title = this.title;
                button.payload = this.payload;
            } else {
                button.type = 'web_url';
                button.url = this.url;
                button.title = this.title;
                button.webview_height_ratio = this.webview_height_ratio;
                button.messenger_extensions = this.messenger_extensions;
                button.fallback_url = this.fallback_url;
            }

            this.$emit('buttonInput', button);
        }
    },
    mounted() {
    },
}
</script>
<style scoped>
* {
    font-size: small;
}

.btn:active {
    background-color: #004cd0c5 !important;
    color: white !important;
}
</style>
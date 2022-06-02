<template>
    <div class="quick-reply-button my-1 text-center col-12">
        <div class="btn border m-0 p-0 col-12" @click="toogleButtonForm">
            {{ quickreply.title }}
        </div>
        <form class="border my-1 py-1 rounded" :hidden="formEdit">
            <div class="d-flex form-group">
                <label for="button-form-postback-type" class="col-5 col-form-label">Content_type :</label>
                <div class="col-7">
                    <input type="text" class="form-control" id="button-form-postback-type" value="postback">
                </div>
            </div>
            <div class="d-flex form-group m-1">
                <label for="button-form-postback-title" class="col-3 col-form-label">Title :</label>
                <div class="col-9">
                    <input type="text" class="form-control" id="button-form-postback-title" v-model="quickreply.title">
                </div>
            </div>
            <div class="d-flex form-group m-1">
                <label for="button-form-postback-payload" class="col-3 col-form-label">Payload : </label>
                <div class="col-9">
                    <input type="text" class="form-control" id="button-form-postback-payload"
                        placeholder="ENTER_PAYLOAD">
                </div>
            </div>
            <div class="btn text-white bg-secondary p-0 col-12" @click="formEdit=true">
                Hide options
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedMode: 'postback', // Default Mode Postback
            formEdit: true,
            quickreply: {
                title: 'Quick Reply'
            },
        }
    },
    methods: {
        toogleButtonForm: function () {
            this.formEdit = !this.formEdit;
        },
    },
    mounted() {
    },
}
</script>
<style scoped>
* {
    font-size: small;
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
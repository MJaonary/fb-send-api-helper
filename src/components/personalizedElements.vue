<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  props: ["id"],
  computed: {
    ...mapGetters({
      content: "getContent",
    }),
    message() {
      return this.content.json.find((item) => item.id == this.id);
    },
  },
  methods: {
    pauseChange: function (e) {
      this.message.data.pause = e.target.value;
    },
    midChange: function (e) {
      this.message.data.mid = e.target.value;
    },
  },
};
</script>

<template>
  <div class="border border-primary col-12 text-center rounded p-1">
    <div v-if="message.data.pause">
      Message Pausing for : (in ms)
      <input
        type="number"
        class="text-center form-control"
        :value="message.data.pause"
        @input="pauseChange"
      />
    </div>
    <div v-if="message.data.mid">
      Sending Message ID :
      <input
        type="text"
        class="text-center form-control"
        :value="message.data.mid"
        @input="midChange"
      />
    </div>
  </div>
</template>

<style></style>

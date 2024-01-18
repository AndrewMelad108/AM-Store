<template>
  <div
    class="model bg-blue-color min-h-44 w-[40vw] z-10 absolute top-[30%] right-[20%] rounded-md flex flex-col p-5"
  >
    <input
      type="text"
      class="block p-2 bg-transparent border border-slate-300 rounded-lg focus:outline-0 placeholder:text-white placeholder:capitalize text-white"
      placeholder="enter your name"
      v-model="Value"
    />
    <div class="flex">
      <button
        class="edit block capitalize mt-5 bg-white mx-auto p-2 rounded-md w-[10vw]"
        @click="update()"
      >
        {{ valueBtn }}
      </button>
      <button
        class="edit block capitalize mt-5 bg-white mx-auto p-2 rounded-md w-[10vw]"
        @click="back()"
      >
        back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "model-section",
  props: ["value", "close", "FunnctionValue"],
  data() {
    return {
      Value: this.value,
      show: this.close,
      valueBtn: this.FunnctionValue,
    };
  },
  methods: {
    update() {
      this.$emit("updata", this.Value);
    },
    back() {
      this.$emit("back");
    },
  },
};
</script>

<style></style>

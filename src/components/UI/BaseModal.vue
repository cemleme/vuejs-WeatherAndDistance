<template>
  <div class="w-screen h-screen">
    <form
      @submit.prevent="Add"
      class="fixed flex backdrop-filter backdrop-blur-md justify-center w-screen h-screen items-center  antialiased"
    >
      <div
        class="flex flex-col w-96 rounded-lg border border-gray-800 shadow-xl"
      >
        <div
          class="flex flex-row justify-between p-6 bg-gray-600 bg-opacity-50 border-b border-gray-800 rounded-tl-lg rounded-tr-lg"
        >
          <p class="font-semibold text-gray-50">{{ modalTitle }}</p>
          <svg
            @click="closeModal"
            class="w-8 h-8 cursor-pointer text-gray-50 fill-current transform hover:scale-125"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div class="flex flex-row px-6 py-5 bg-gray-600 bg-opacity-50">
          <div class="w-full">
            <slot></slot>
          </div>
        </div>
        <div
          class="text-right p-5 bg-gray-600 bg-opacity-50 border-gray-800 rounded-bl-lg rounded-br-lg"
        >
          <button
            type="submit"
            v-if="showAddButton"
            class="px-4 py-2 text-white font-semibold bg-gray-900 hover:bg-gray-500 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    addButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["add-widget"],
  computed: {
    showAddButton() {
      return this.addButton;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModals");
    },
    Add() {
      this.$emit("add-widget");
      this.closeModal();
    },
  },
};
</script>

<template>
  <div class="flex flex-row bg-gray-900 w-full bg-opacity-80 text-white p-2">
    <h2 class="mr-auto mt-2">Weather & Distance Widgets</h2>
    <button
      v-if="!showModal"
      @click="openModal"
      class="ml-auto p-2 fill-current bg-gray-700 transform hover:scale-125 hover:bg-gray-500 bg-opacity-40"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["open-modal"],
  methods: {
    openModal() {
      this.$emit("open-modal");
    },
  },
  computed: {
    showModal() {
      return this.$store.getters.isModalOpen;
    },
  },
};
</script>

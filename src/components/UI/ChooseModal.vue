<template>
    <add-weather-modal v-if="showWeatherModal" />
    <add-map-modal v-else-if="showMapModal" />
    <base-modal v-else modal-title="Choose Widget to Add" :add-button="false">
      <button
        @click="openWeatherModal"
        class="px-4 py-2 text-white font-semibold bg-gray-900 hover:bg-gray-500 w-full rounded cursor-pointer"
      >
        Add Weather Widget
      </button>

      <button
        @click="openMapModal"
        class="mt-4 px-4 py-2 text-white font-semibold bg-gray-900 hover:bg-gray-500 w-full rounded cursor-pointer"
      >
        Add Map Widget
      </button>
    </base-modal>
</template>

<script>
import AddMapModal from "./AddMapModal.vue";
import AddWeatherModal from "./AddWeatherModal.vue";

export default {
  components: {
    AddWeatherModal,
    AddMapModal,
  },
  computed: {
    showWeatherModal() {
      return this.$store.getters.isWeatherModalOpen;
    },
    showMapModal() {
      return this.$store.getters.isMapModalOpen;
    },
    isBlur() {
      if (this.showWeatherModal) return "filter blur-lg";
      else return "";
    },
  },
  methods: {
    openWeatherModal() {
      this.$store.dispatch("openWeatherModal");
    },
    openMapModal() {
      this.$store.dispatch("openMapModal");
    },
  },
};
</script>
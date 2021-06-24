<template>
  <base-modal modal-title="Weather - Add City" @add-widget="addWeatherWidget">
    <label for="cityName" class="mb-2 font-semibold text-gray-50"
      >City Name:</label
    >
    <input
      type="text"
      name=""
      class="w-full mt-4 p-1 bg-white border border-gray-200 rounded shadow-sm appearance-none"
      id="cityName"
      placeholder="Enter City Name..."
      ref="cityName"
    />
  </base-modal>
</template>

<script>

export default {
  mounted() {
    this.$nextTick(() => {
      this.$refs.cityName.focus();
    });
  },
  methods: {
    addWeatherWidget()
    {
      this.$store.dispatch('addWeatherWidget', { city: this.$refs.cityName.value});

      this.$store.dispatch("closeModals");
    }
  }
};
</script>

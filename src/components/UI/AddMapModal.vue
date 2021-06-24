<template>
  <base-modal modal-title="Map - Add Coordinates" @add-widget="addMapWidget">
    <label for="targetName" class="mb-2 font-semibold text-gray-50"
      >Target Name:</label
    >
    <input
      type="text"
      name=""
      class="w-full mt-4  mb-8 p-1 bg-white border border-gray-200 rounded shadow-sm appearance-none"
      id="targetName"
      ref="targetName"
      placeholder="Enter Target Name"
    />

    <label for="target" class=" mb-2 font-semibold text-gray-50"
      >Target Coordinates:</label
    >
    <input
      type="text"
      name=""
      class="w-full mt-4 p-1 bg-white border border-gray-200 rounded shadow-sm appearance-none"
      id="target"
      ref="target"
      placeholder="Enter Target Coordinates..."
    />
  </base-modal>
</template>

<script>

export default {
  mounted() {
    this.$nextTick(() => {
      this.$refs.targetName.focus();
    });
  },
  methods: {
    addMapWidget() {
      this.$store.dispatch("addMapWidget", {
        toName: this.$refs.targetName.value,
        toCoordinates: this.$refs.target.value,
      });

      this.$store.dispatch("closeModals");
    },
  },
};
</script>

<template>
  <transition>
    <ChooseWidgetModal v-if="showModal" />
  </transition>
  <div class="flex justify-center">
    <div class="max-w-md ">
      <the-top-bar @openModal="openModal" />
      <div
        class="grid grid-cols-2 auto-rows-auto content-center justify-center w-full"
      >
        <weather-widget
          v-for="city in weatherCities"
          :key="city"
          :city="city"
        />

        <map-widget
          v-for="target in mapTargets"
          :key="target.toName"
          :to="target.toCoordinates"
          :toName="target.toName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherWidget from "./components/widgets/weatherWidget.vue";
import MapWidget from "./components/widgets/mapWidget.vue";
import ChooseWidgetModal from "./components/UI/ChooseModal.vue";
import TheTopBar from "./components/layouts/TheTopBar.vue";

export default {
  components: { WeatherWidget, MapWidget, ChooseWidgetModal, TheTopBar },
  computed: {
    mapTargets() {
      return this.$store.getters.mapTargets;
    },
    weatherCities() {
      return this.$store.getters.cities;
    },
    showModal() {
      return this.$store.getters.isModalOpen;
    },
    isBlur() {
      if (this.showModal) return "filter blur-lg";
      else return "";
    },
  },
  methods: {
    openModal() {
      this.$store.dispatch('openModal');
    },
  },
  async beforeCreate() {
    await this.$store.dispatch("tryLogin");
    this.$store.dispatch('loadWeatherCities');
    this.$store.dispatch('loadMapTargets');
  },
};
</script>

<style>
body {
  background-image: url("https://source.unsplash.com/1600x900/?landscape,day");
}

circle {
  fill: transparent;
  stroke: #fff;
  stroke-linecap: round;
  stroke-dasharray: 200;
  stroke-dashoffset: 150;
  stroke-width: 10px;
}

.v-enter-from {
  transform: translateY(-100px);
  opacity: 0;
}

.v-enter-active {
  transition: all 0.4s ease-out;
  backdrop-filter: blur(12px);
}

.v-enter-to {
  transform: translateY(0px);
  opacity: 1;
}
</style>

<template>
  <div class="w-full bg-transparent">
    <div
      v-if="!weatherData"
      class="flex items-center justify-center w-full h-32 bg-black bg-opacity-40 text-white"
    >
      <svg class="animate-spin w-12" viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45"/>  
      </svg>
    </div>
    <div
      v-else
      class="relative w-full h-full bg-opacity-80"
      :class="weatherClass"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
          <button
        v-if="hover"
        @click="deleteWeatherWidget"
        class="absolute top-1 right-1 fill-current transform hover:scale-125 bg-opacity-40 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>

      <div class="grid grid-cols-2 p-2 pr-4">
        <div
          class="flex flex-col items-center justify-center font-medium text-6xl "
        >
          {{ tempCelsius }}
        </div>

        <div class="flex flex-col items-center justify-center">
          <img :src="weatherIcon" alt="" />
        </div>

        <div class="flex flex-col items-center justify-center">
          <div class="font-bold text-xl">{{ weatherData.name }}</div>
          <div class="text-sm ">{{ today }}</div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <div class="text-center">
            {{ weatherData.description }}
          </div>
          <div class="text-center">
            <span class="text-sm font-light ">{{ minCelsius }}</span>
            /
            <span class="text-sm font-light ">{{ maxCelsius }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
      weatherData: null,
      isNight: false,
      textColors: {
        "01d": "800", //
        "01n": "50", //	clear sky
        "02d": "50", //
        "02n": "50", //	few clouds
        "03d": "600", //
        "03n": "50", //	scattered clouds
        "04d": "800", //
        "04n": "50", //	broken clouds
        "09d": "50", //
        "09n": "50", //	shower rain
        "10d": "800", //
        "10n": "50", //	rain
        "11d": "50", //
        "11n": "50", //	thunderstorm
        "13d": "50", //
        "13n": "50", //	snow
        "50d": "50", //
        "50n": "50", //	mist
      },
      backgroundColors: {
        "01d": "bg-blue-300", //
        "01n": "bg-blue-400", //	clear sky
        "02d": "bg-gray-200", //
        "02n": "bg-gray-200", //	few clouds
        "03d": "bg-gray-300", //
        "03n": "bg-gray-300", //	scattered clouds
        "04d": "bg-gray-500", //
        "04n": "bg-gray-500", //	broken clouds
        "09d": "bg-gray-300", //
        "09n": "bg-gray-500", //	shower rain
        "10d": "bg-gray-400", //
        "10n": "bg-gray-600", //	rain
        "11d": "bg-gray-600", //
        "11n": "bg-gray-800", //	thunderstorm
        "13d": "bg-gray-100", //
        "13n": "bg-gray-100", //	snow
        "50d": "bg-gray-200", //
        "50n": "bg-gray-400", //	mist
      },
    };
  },
  computed: {
    tempCelsius() {
      return Math.round(this.weatherData.temp) + "°";
    },
    maxCelsius() {
      return Math.round(this.weatherData.max) + " °";
    },
    minCelsius() {
      return Math.round(this.weatherData.min) + " °";
    },
    weatherIcon() {
      return (
        "http://openweathermap.org/img/wn/" + this.weatherData.iconName + "@2x.png"
      );
    },
    weatherClass() {
      return this.textColor + " " + this.weatherBackground;
    },
    textColor() {
      return "text-gray-" + this.textColors[this.weatherData.iconName];
    },
    weatherBackground() {
      return this.backgroundColors[this.weatherData.iconName];
    },
    today() {
      return new Date().toLocaleDateString("tr");
    },
  },
  created() {
    this.$store.dispatch('loadWeatherData', {cityName: this.city}).then((response) => {
      this.weatherData = this.$store.getters.cityData(response);
    });
  },
  methods: {
    deleteWeatherWidget() {
      this.$store.dispatch('deleteWeatherWidget', {cityName : this.city});
    },
  }
};
</script>

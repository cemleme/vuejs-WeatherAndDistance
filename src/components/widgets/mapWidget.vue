<template>
  <div class="w-full bg-transparent">
    <div
      v-if="!this.route"
      class="flex items-center justify-center w-full h-36 bg-black bg-opacity-40 text-white"
    >
      <svg
        class="animate-spin w-12"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>
    <div
      v-if="this.route"
      class="relative w-full h-full shadow-2xl bg-gray-700 bg-opacity-80"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <button
        v-if="hover"
        @click="deleteRoute"
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
      <div class="grid grid-cols-2 auto-rows-fr p-2 pr-4 text-white">
        <div
          class="flex flex-col items-center justify-center font-medium text-xl "
        >
          {{ route.formattedTime }}
        </div>

        <div class="flex flex-col items-center justify-center">
          <img style="width:70px; height:70px" :src="carIcon" alt="" />
        </div>

        <div class="flex flex-col items-center justify-center text-sm">
          <div class="text-center">
            {{ route.fromName }}
          </div>
          <div class="text-center">
            {{ route.fromStreet }}, {{ route.fromArea }}
          </div>
        </div>

        <div class="flex flex-col items-center justify-center text-sm">
          <div class="text-center">
            {{ route.toName }}
          </div>
          <div class="text-center">
            {{ route.toStreet }}, {{ route.toArea }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      require: true,
    },
    toName: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      route: null,
      hover: false,
    };
  },
  computed: {
    carIcon() {
      return require("@/assets/car.png");
    },
  },
  created() {
    this.getRouteFromCurrentLocation();
  },
  methods: {
    deleteRoute() {
      this.$store.dispatch('deleteRoute', {toName : this.toName});
    },
    getLongAndLat() {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    },
    async getRouteFromCurrentLocation() {
      const pos = await this.getLongAndLat();

      this.gettingLocation = false;
      this.location = pos;

      const coordsFrom = pos.coords.latitude + "," + pos.coords.longitude;

      const mapData = {
        from: coordsFrom,
        fromName: "current loc:",
        to: this.to,
        toName: this.toName,
      };

      this.$store.dispatch("addMapTarget", mapData).then((response) => {
        this.route = response;
      });
    },
  },
};
</script>

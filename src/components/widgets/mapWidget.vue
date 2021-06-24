<template>
  <div class="w-full bg-transparent">
    <div
      v-if="!this.route"
      class="flex items-center justify-center w-full h-36 bg-black bg-opacity-40 text-white"
    >
      <svg class="animate-spin w-12" viewBox="0 0 100 100"  xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45"/>  
      </svg>
    </div>
    <div v-if="this.route" class="w-full h-full shadow-2xl bg-gray-700 bg-opacity-80">
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
            {{ route.fromStreet }}, {{ route.fromArea}}
          </div>
        </div>

        <div class="flex flex-col items-center justify-center text-sm">
          <div class="text-center">
            {{ route.toName }}
          </div>
          <div class="text-center">
            {{ route.toStreet }}, {{ route.toArea}}
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

      const mapData= {
        from: coordsFrom,
        fromName: "current loc:",
        to: this.to,
        toName: this.toName
      };

      this.$store.dispatch('addMapTarget', mapData).then((response) => {
        this.route = response;
      });
    },
  },
};
</script>

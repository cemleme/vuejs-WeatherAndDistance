import axios from "axios";

export default {
  state: {
    weatherModalIsOpen: false,
    weatherCities: [],
    weatherDatas: [],
  },
  mutations: {
    addWeatherWidget(state, payload) {
      state.weatherCities.push(payload.city);
    },
    openWeatherModal(state) {
      state.weatherModalIsOpen = true;
    },
    setWeatherData(state, payload) {
      const weatherData = payload;
      if (state.weatherDatas.some((data) => data.name === weatherData.name)) {
        const elementsIndex = state.weatherDatas.findIndex(
          (data) => data.name === weatherData.name
        );
        state.weatherDatas[elementsIndex] = weatherData;
      } else {
        state.weatherDatas.push(weatherData);
      }
    },
    setWeatherCities(state, payload) {
      state.weatherCities = payload.cities;
    },
    async deleteWeatherWidget(state, payload){
      state.weatherCities = state.weatherCities.filter(weather => weather != payload.cityName);
    }
  },
  actions: {
    async loadWeatherCities(context) {
      const userId = context.getters.userId;

      const response = await fetch(
        process.env.VUE_APP_FIREBASE_DB_URL + userId +'/weather.json',
        {
          method: "GET"
        }
      );

      if(response.ok){

        const responseData = await response.json();

        const cities = []; 

        for(const key in responseData){
          cities.push(responseData[key]);
        }

        context.commit('setWeatherCities', {cities:cities});
      }
    },
    saveWeatherCities(context) {
      const userId = context.getters.userId;

      fetch(
        process.env.VUE_APP_FIREBASE_DB_URL + userId +'/weather.json',
        {
          method: "PUT",
          body: JSON.stringify(context.getters.cities),
        }
      );
    },
    addWeatherWidget(context, payload) {
      context.commit("addWeatherWidget", payload);
      context.dispatch("saveWeatherCities");
    },
    openWeatherModal(context) {
      context.commit("openWeatherModal");
    },
    async loadWeatherData(context, payload) {
      const response = await axios.get(
        context.getters.weatherAPIURL(payload.cityName)
      );

      if (response.status !== 200) {
        //errori
        console.log("error");
        console.log(response);
      }

      const weatherData = {
        name: response.data.name,
        description: response.data.weather[0].description,
        iconName: response.data.weather[0].icon,
        temp: response.data.main.temp,
        max: response.data.main.temp_max,
        min: response.data.main.temp_min,
      };

      context.commit("setWeatherData", weatherData);

      return response.data.name;
    },
    async deleteWeatherWidget(context, payload){
      await this.commit('deleteWeatherWidget', payload);
      this.dispatch('saveWeatherCities');
    }
  },
  getters: {
    isWeatherModalOpen(state) {
      return state.weatherModalIsOpen;
    },
    weatherAPIURL: () => (cityName) => {
      return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.VUE_APP_OPENWEATHERMAP_KEY}`;
    },
    cities(state) {
      return state.weatherCities;
    },
    cityData: (state) => (cityName) => {
      const elementsIndex = state.weatherDatas.findIndex(
        (data) => data.name === cityName
      );
      if (elementsIndex == -1) return null;
      else return state.weatherDatas[elementsIndex];
    },
  },
};

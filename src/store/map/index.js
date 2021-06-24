import axios from "axios";

export default {
  state: {
    mapModalIsOpen: false,
    mapTargets: [],
    mapDatas: []
  },
  mutations: {
    openMapModal(state) {
      state.mapModalIsOpen = true;
    },
    addMapWidget(state, payload) {
      state.mapTargets.push(payload);
    },
    setMapData(state, payload) {
      const mapData = payload;

      const elementsIndex = state.mapDatas.findIndex(
        (data) => data.toName === mapData.toName
      );

      if (elementsIndex == -1) {
        state.mapDatas.push(mapData);
      } else {
        state.mapDatas[elementsIndex] = mapData;
      }
    },
    setMapTargets(state, payload) {
      state.mapTargets = payload.targets;
    }
  },
  actions: {    
    async loadMapTargets(context) {
    const userId = context.getters.userId;

    const response = await fetch(
      VUE_APP_FIREBASE_DB_URL + userId +'/map.json',
      {
        method: "GET"
      }
    );

    if(response.ok){

      const responseData = await response.json();

      const mapTargets = []; 

      for(const key in responseData){
        const target = {
          toName: responseData[key].toName,
          toCoordinates: responseData[key].toCoordinates
        };
        mapTargets.push(target);
      }
      context.commit('setMapTargets', {targets:mapTargets});
    }
  },
  saveMapTargets(context) {
    const userId = context.getters.userId;

    fetch(
      VUE_APP_FIREBASE_DB_URL + userId +'/map.json',
      {
        method: "PUT",
        body: JSON.stringify(context.getters.mapTargets),
      }
    );
  },
    openMapModal(context) {
      context.commit("openMapModal");
    },
    addMapWidget(context, payload) {
      context.commit("addMapWidget", payload);
      context.dispatch("saveMapTargets");
    },
    async addMapTarget(context, payload) {
      const response = await axios.get(
        context.getters.mapsAPIURL(payload.from, payload.to)
      );

      if (response.status !== 200) {
        //errori
        console.log("error");
        console.log(response);
      }

      const mapData = {
          fromName: payload.fromName,
          toName: payload.toName,
          formattedTime: response.data.route.formattedTime,
          toStreet: response.data.route.locations[1].street,
          toArea: response.data.route.locations[1].adminArea3,
          fromStreet: response.data.route.locations[0].street,
          fromArea: response.data.route.locations[0].adminArea3,
      };

      context.commit("setMapData", mapData);

      return mapData;
    },
  },
  getters: {
    isMapModalOpen(state) {
      return state.mapModalIsOpen;
    },
    mapTargets(state) {
      return state.mapTargets;
    },
    mapsAPIURL: () => (from, to) => {
      var base =
        "http://www.mapquestapi.com/directions/v2/route?key="+process.env.VUE_APP_MAPQUEST_KEY;
      base += "&from=" + from;
      base += "&to=" + to;
      return base;
    },
    mapData: (state) => (toName) => {
      const elementsIndex = state.mapDatas.findIndex(
        (data) => data.toName === toName
      );
      if (elementsIndex == -1) return null;
      else return state.mapDatas[elementsIndex];
    },
  },
};

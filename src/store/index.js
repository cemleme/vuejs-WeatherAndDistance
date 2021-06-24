import { createStore } from 'vuex'

import auth from './auth';
import weather from './weather';
import map from './map';

export default createStore({
  modules: {
    auth,
    weather,
    map
  },
  state: {
    chooseModalIsOpen: false,
  },
  mutations: {
    closeModals(state){
      state.chooseModalIsOpen = false;
      state.weather.weatherModalIsOpen = false;
      state.map.mapModalIsOpen = false;
    },
    openModal(state){
      state.chooseModalIsOpen = true;
    }
  },
  actions: {
    closeModals(context){
      context.commit('closeModals');
    },
    openModal(context){
      context.commit('openModal');
    }
  },
  getters: {
    isModalOpen(state){
      return state.chooseModalIsOpen || state.weather.weatherModalIsOpen || state.map.mapModalIsOpen;
    },
  }
})

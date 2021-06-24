import axios from "axios";

export default {
  state: {
    userId: null,
    token: null,
    refreshToken: null,
    expiresIn: null,
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.expiresIn = payload.expiresIn;
      state.refreshToken = payload.refreshToken;

      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("expiresIn", state.expiresIn);
    },
  },
  actions: {
    async tryLogin(context) {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");
      const expiresIn = localStorage.getItem("expiresIn");

      if (token && userId && refreshToken) {
        context.commit("setUser", {
          token: token,
          userId: userId,
          expiresIn: expiresIn,
          refreshToken: refreshToken,
        });

        await context.dispatch("login");
      } else {
        await context.dispatch("signup");
      }
    },
    async login(context) {
      const tokenData = JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: context.state.refreshToken + "",
      });

      const response = await fetch(
        "https://securetoken.googleapis.com/v1/token?key="+process.env.VUE_APP_FIREBASE_KEY,
        {
          method: "POST",
          "Content-Type": "application/x-www-form-urlencoded",
          body: tokenData,
        }
      );
      const responseData = await response.json();

      if (response.status != 200) {
        const error = new Error(responseData.message || "Failed to login.");
        throw error;
      }

      context.commit("setUser", {
        token: responseData.id_token,
        userId: responseData.user_id,
        expiresIn: responseData.expires_in,
        refreshToken: responseData.refresh_token,
      });
    },
    async signup(context) {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.VUE_APP_FIREBASE_KEY,
        {
          "Content-Type": "application/json",
        }
      );

      const responseData = await response.data;

      if (response.status != 200) {
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        expiresIn: responseData.expiresIn,
        refreshToken: responseData.refreshToken,
      });
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
};

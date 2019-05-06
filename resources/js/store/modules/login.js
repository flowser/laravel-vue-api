
//login
const state = {
    accessToken: null,

  },
  getters = {
    Token(state){
      return state.accessToken;
    },
    loggedIn(state){
        return state.accessToken != null;
    }
  };
const actions = {
    retrieveToken({ commit }, credentials) {
        return new Promise((resolve, reject) =>{
            axios.post('/api/login', credentials)
                .then(response => {
                    localStorage.setItem('accessToken', response.data.access_token);
                    commit('updateAccessToken', response.data.access_token);
                    resolve(response)
                })
                .catch(error => {
                   commit('updateAccessToken', null);
                   reject(error);
                });
        })
      },
      fetchAccessToken({ commit }) {
        commit('updateAccessToken', localStorage.getItem('accessToken'));
      },
      destroyToken(context){//done only whne logged in
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.accessToken;
        if(context.getters.loggedIn){
            return new Promise((resolve, reject) =>{
                axios.post('/api/logout')
                    .then(response => {
                        localStorage.removeItem('accessToken');
                        context.commit('destroyToken');
                        resolve(response);
                    })
                    .catch(error => {
                        localStorage.removeItem('accessToken');
                        context.commit('destroyToken');
                        reject(error);
                    });
            });
        }
      }
    };
const mutations = {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    destroyToken(state){
        state.accessToken = null;
    }
  };
export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

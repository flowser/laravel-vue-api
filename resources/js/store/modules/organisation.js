
//login
const state = {
    token: null,
  },
  getters = {
    Token(state){
      return state.token;
    },
  };
const actions = {
    retrieveToken(context, credentials){
        console.log(credentials);
        axios.post('/api/login', credentials)
        .then((response)=>{
          console.log(response);
        //   lets store token and pass it commit
        localStorage.setItem('access_token', response.data.access_token)

        console.log(localStorage.getItem('access_token'));
        context.commit('token', localStorage.getItem('access_token'));
        })
        .catch((response)=>{
            console.log(response)
        })
    },
  };
const mutations = {
    token(state, token){
         state.token = token;
    },
  };
export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import axios from 'axios'
const baseUrlAPI = 'https://v3.tissini.app/api/v3/'
const moduleAuthentication = {
    namespaced: true,
    state: () => ({
      loggedIn: false
    }),
    mutations: {
      loggedIn (state) {
          console.log("se pasa a true");
        state.loggedIn = true
      },
    },
    actions: {
        async login ({commit}, credentials) {
            commit('loggedIn')
            var entrepreneur
            try {
                const client = await axios.post(baseUrlAPI + 'login/client', credentials)
                entrepreneur = client.data.customer
            } catch (error) {
                const status = error.response.data.status
                if(status === 'not_found')
                    entrepreneur = {}
                
            }
            return entrepreneur
        }
    }
  
  }
  
  export default moduleAuthentication
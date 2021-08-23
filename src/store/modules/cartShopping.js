const moduleCartShopping = {
    namespaced: true,
    state: () => ({
      items: 0
    }),
    getters: { 
        getItems: state => {
            return state.items
        }
    },
    mutations: {
      setItem (state, item) {
          state.items = item
      }
    }
  }
  
  export default moduleCartShopping
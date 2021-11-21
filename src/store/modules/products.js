import axios from "axios";
const state ={
    products: {},
};

const getters = {
    product: state => state.products,
};

const actions = {
    initStore: ({commit}) =>{
        axios.get("/static/products.json").then(response =>{
          commit("SET_STORE", response.data.products);
      })
      }
};

const mutations = {
    "SET_STORE" (state, products){
        state.products = products;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
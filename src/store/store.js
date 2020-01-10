import Vue from 'vue'
import Vuex from "vuex";
import axios from "axios";
import VueRouter from '../router.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        particiants: [],
        identifier: 0
    },
    mutations : {
        saveData(state, identifier) {
            this.state.identifier = identifier
        },

        loadData(state, particiants) {
            this.state.particiants = particiants;
        }
    },
    actions: {
        async saveData(context) {
            let payload = {'payload': this.state.particiants};
            this.state.identifier = null;
            await axios.post('/ping', payload)
                .then(function(response) {context.commit('saveData', response.data.id); return response;})
                .then(response => (VueRouter.push('/' + response.data.id)))
                .catch(response => (console.warn(response)));

        },

        async loadData(context, payload) {
            this.state.identifier = payload.id;
            await axios.get('/get?uuid=' + payload.id)
                .then(response => (context.commit('loadData', JSON.parse(response.data.Payload))))
                .catch(response => (console.warn(response)));
        }
    }
});

export default store

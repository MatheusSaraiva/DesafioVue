import Vue from "vue";
import Router from 'vue-router';
import Detalhamento from './components/Detalhamento';
import Editar from './components/Editar';
import Listagem from './components/Listagem';


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
    {
        path: '/:tipo',
        component: Listagem
    },{
        path:'/:tipo/detalhamento/:id',
        component: Detalhamento
    },{
        path:'/:tipo/editar/:id',
        component: Editar
    },{
        path:'/:tipo/cadastra/',
        component: Editar
    },
]
})
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
        name: 'list',
        component: Listagem
    },{
        path:'/:tipo/detalhamento/:id',
        name: 'detalher',
        component: Detalhamento
    },{
        path:'/:tipo/editar/:id',
        name: 'editar',
        component: Editar
    },{
        path:'/:tipo/cadastra/',
        name: 'cadastro',
        component: Editar
    },
]
})
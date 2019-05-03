
import Cidade from './components/Cidade.vue';


export const routes = [

    { path: '', component: Cidade},
    { path: '/cidade/:nomeCidade', component: Cidade, name: 'cidade', props: true }
    

];
<template>
      <div>
            <b-list-group horizontal>
              <b-list-group-item>               
                <autocomplete
                  source="https://servicodados.ibge.gov.br/api/v1/localidades/municipios?q="
                
                  ref="autocomplete"
                  results-property="items"
               
                  :results-display="formatadaCidade"
                  @selected="selectCidade"
                  placeholder="Cidade"
                ></autocomplete>
              </b-list-group-item>

              <b-list-group-item v-for="(n,index) in 5" :key="index" v-show="favsCid[index]!= undefined"  >
                 <router-link  v-if="favsCid[index]!= undefined"
                 :to="{ name: 'cidade', params: { nomeCidade: favsCid[index].nome.replace('-',',') }}"
                 :key="$route.fullPath">
                   {{favsCid[index].nome.replace("-BR","")}}
                 </router-link>                 
              </b-list-group-item>    

            </b-list-group>
            <b-form-input hidden v-model="filtroCidade"/>
      </div>
</template>
<script>

import Autocomplete from "vuejs-auto-complete";


export default {
 components: {
     'autocomplete': Autocomplete
  },

props: [ 'favsCid', 'filtroCidade' ]
,
 
  methods: {
    
    formatadaCidade(result) {
      return result.nome + " - " + result.microrregiao.mesorregiao.UF.sigla;
    },

    selectCidade(cid) {
      this.$emit('update:filtroCidade', cid.selectedObject.nome + ",BR")   
      this.$refs.autocomplete.clear()
       this.$router.replace({
           name: 'cidade', params: {nomeCidade: cid.selectedObject.nome + ",BR" }
        });   
    }
  }
}
</script>
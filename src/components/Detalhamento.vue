<template>
  <b-container>
    <b-col>
      <b-card border-variant="light" header="Detalhamento" class="text-center">
        <b-card-text>
          <b-row>
            <b-col>Nome: </b-col>
            <b-col>{{ dados_detalhamento.nome }}</b-col>
          </b-row>
          <b-row>
            <b-col>Origem: </b-col>
            <b-col>{{ dados_detalhamento.origem }}</b-col>
          </b-row>

          <b-row v-if="tipo == 'carros'">
            <b-col>Ano: </b-col>
            <b-col>{{ dados_detalhamento.ano }}</b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-col>
    <b-col> </b-col>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
    created() {
         this.detalhamento(this.$route.params.id)
    },
    data(){
        return {
            dados_detalhamento: [],
            tipo: this.$route.params.tipo,
        }
    },
    methods: {
            detalhamento(id) {
      axios.get("http://127.0.0.1:8000/"+this.tipo+"/" + id + "/").then((res) => {
        this.dados_detalhamento = res.data;
        console.log(this.dados_detalhamento);
      });
      
    },
    }
};
</script>

<style>
</style>
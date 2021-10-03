<template>
  <b-container>
    <b-button variant="outline-dark" @click="mudar_tabela()"
      >
      <samp v-if="tipo == 'marcas'">Ir para tabela de Carros</samp>
      <samp v-else>Ir para tabela de Marcas</samp>
      </b-button
    >

    <b-table bordered striped hover :items="dados.results" :fields="fields">
      <template #cell(Detalhamento)="data">
        <b-button
          variant="outline-dark"
          @click="$router.push(tipo+'/detalhamento/' + data.item.id)"
          >Detalhamento</b-button
        >
      </template>

      <template #cell(Edicao)="data">
        <b-button
          variant="outline-dark"
          @click="$router.push(tipo +'/editar/' + data.item.id)"
          >Editar</b-button
        >
      </template>

      <template #cell(Remocao)="data">
        <b-button
          variant="outline-danger"
          @click="remocao(data.item.id)"
          >Remocao</b-button
        >
      </template>
    </b-table>
        <b-button variant="outline-dark" @click="$router.push(tipo +'/cadastra/')"
      >Cadastro</b-button
    >
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.ober_listagem();
  },
  data() {
    return {
      fields: ["nome", "origem", "ano", "Detalhamento", "Edicao", "Remocao"],
      dados: [],
      tipo: this.$route.params.tipo,
    };
  },
  methods: {
    ober_listagem() {
      axios.get("http://127.0.0.1:8000/"+this.tipo+"/").then((res) => {
        this.dados = res.data;
      });
    },
    remocao(id) {
      axios
        .delete("http://127.0.0.1:8000/"+this.tipo+"/" + id + "/")
        .then(() => {
          console.log("Usuário deletado com sucesso");
          this.ober_listagem()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mudar_tabela(){
      if(this.tipo == 'carros'){
        this.tipo = 'marcas'
        this.ober_listagem()
      } else {
        this.tipo = 'carros'
        this.ober_listagem()
      }
    }
  },
};
</script>

<style>
</style>
<template>
  <b-container>
    <div class="form-group row">
      <label for="nome" class="col-sm-2 col-form-label"><b>Nome</b></label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="nome"
          placeholder="Nome"
          v-model="dados.nome"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Cavalor_de_forca" class="col-sm-2 col-form-label"
        ><b>Cavalor de forca</b></label
      >
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="Cavalor_de_forca"
          placeholder="Cavalor de forca"
          v-model="dados.cavalor_de_forca"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Peso" class="col-sm-2 col-form-label"><b>Peso</b></label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="Peso"
          placeholder="Peso"
          v-model="dados.peso"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Aceleracao" class="col-sm-2 col-form-label"
        ><b>Aceleracao</b></label
      >
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="Aceleracao"
          placeholder="aceleracao"
          v-model="dados.aceleracao"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Ano" class="col-sm-2 col-form-label"><b>Ano</b></label>
      <div class="col-sm-10">
        <input
          type="datetime"
          class="form-control"
          id="Ano"
          placeholder="Ano"
          v-model="dados.ano"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Cilindros" class="col-sm-2 col-form-label"
        ><b>Cilindros</b></label
      >
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="Cilindros"
          placeholder="Cilindros"
          v-model="dados.cilindros"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Km_por_galao" class="col-sm-2 col-form-label"
        ><b>Km por galao</b></label
      >
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="Km_por_galao"
          placeholder="Km_por_galao"
          v-model="dados.km_por_galao"
        />
      </div>
    </div>
    <br />

    <div class="form-group row">
      <label for="Origem" class="col-sm-2 col-form-label"><b>Origem</b></label>
      <div class="col-sm-10">
        <input
          type="text"
          class="form-control"
          id="Origem"
          placeholder="Origem"
          v-model="dados.origem"
        />
      </div>
    </div>
    <br />

    <button class="btn btn-primary" @click="cadastramento()">Entrar</button>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  created() {},
  data() {
    return {
      dados: {
        nome: "",
        km_por_galao: null,
        cilindros: null,
        cavalor_de_forca: null,
        peso: null,
        aceleracao: null,
        ano: null,
        origem: "",
      },
    };
  },
  methods: {
    cadastramento() {
      axios.post("http://127.0.0.1:8000/carros/", this.dados).then(
        (this.dados = {
          nome: "",
          km_por_galao: null,
          cilindros: null,
          cavalor_de_forca: null,
          peso: null,
          aceleracao: null,
          ano: null,
          origem: "",
        })
      );
    },
  },
};
</script>

<style>
</style>
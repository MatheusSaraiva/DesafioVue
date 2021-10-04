<template>
  <b-container>
    <br />
    <h2 v-if="id">Atualização de {{ tipo }}</h2>
    <H2 v-else>Cadastramento de {{ tipo }}</H2>
    <div class="form-group row">
      <label for="nome" class="col-sm-2 col-form-label"><b>Nome</b></label>
      <div class="col-sm-10">
        <input
          name="nome"
          v-validate
          data-vv-rules="required"
          type="text"
          class="form-control"
          id="nome"
          placeholder="Nome"
          v-model="dados_detalhamento.nome"
        />
        <span class="erro" v-show="errors.has('nome')">{{
          errors.first("nome")
        }}</span>
      </div>
    </div>
    <br />
    <samp v-if="tipo == 'carros'">
      <div class="form-group row">
        <label for="Cavalor_de_forca" class="col-sm-2 col-form-label"
          ><b>Cavalor de forca</b></label
        >
        <div class="col-sm-10">
          <input
            name="Cavalor_de_forca"
            v-validate
            data-vv-rules="required|integer"
            type="number"
            class="form-control"
            id="Cavalor_de_forca"
            placeholder="Cavalor de forca"
            v-model="dados_detalhamento.cavalor_de_forca"
          />
          <span class="erro" v-show="errors.has('Cavalor_de_forca')">{{
            errors.first("Cavalor_de_forca")
          }}</span>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="Peso" class="col-sm-2 col-form-label"><b>Peso</b></label>
        <div class="col-sm-10">
          <input
            name="Peso"
            v-validate
            data-vv-rules="required|"
            type="number"
            class="form-control"
            id="Peso"
            placeholder="Peso"
            v-model="dados_detalhamento.peso"
          />
          <span class="erro" v-show="errors.has('Peso')">{{
            errors.first("Peso")
          }}</span>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="Aceleracao" class="col-sm-2 col-form-label"
          ><b>Aceleracao</b></label
        >
        <div class="col-sm-10">
          <input
            name="aceleracao"
            v-validate
            data-vv-rules="required"
            type="number"
            class="form-control"
            id="Aceleracao"
            placeholder="aceleracao"
            v-model="dados_detalhamento.aceleracao"
          />
          <span class="erro" v-show="errors.has('aceleracao')">{{
            errors.first("aceleracao")
          }}</span>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="Ano" class="col-sm-2 col-form-label"><b>Ano</b></label>
        <div class="col-sm-10">
          <b-form-datepicker
            id="datepicker-dateformat2"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="pt"
            v-model="dados_detalhamento.ano"
            class="mb-2"
          ></b-form-datepicker>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="Cilindros" class="col-sm-2 col-form-label"
          ><b>Cilindros</b></label
        >
        <div class="col-sm-10">
          <input
            name="Cilindros"
            v-validate
            data-vv-rules="required|integer"
            type="number"
            class="form-control"
            id="Cilindros"
            placeholder="Cilindros"
            v-model="dados_detalhamento.cilindros"
          />
          <span class="erro" v-show="errors.has('Cilindros')">{{
            errors.first("Cilindros")
          }}</span>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="Km_por_galao" class="col-sm-2 col-form-label"
          ><b>Km por galao</b></label
        >
        <div class="col-sm-10">
          <input
            name="Km_por_galao"
            v-validate
            data-vv-rules="required"
            type="number"
            class="form-control"
            id="Km_por_galao"
            placeholder="Km por galao"
            v-model="dados_detalhamento.km_por_galao"
          />
          <span class="erro" v-show="errors.has('Km_por_galao')">{{
            errors.first("Km_por_galao")
          }}</span>
        </div>
      </div>
      <br />

      <div class="form-group row">
        <label for="marca" class="col-sm-2 col-form-label"><b>Marca</b></label>
        <div class="col-sm-10">
          <select
            v-model="dados_detalhamento.marca"
            id="marca"
            class="form-control"
          >
            <option
              v-for="marca in dados_litagem_marca"
              :key="marca.id"
              :value="marca.id"
            >
              {{ marca.nome }}
            </option>
          </select>
        </div>
      </div>
      <br />
    </samp>

    <div class="form-group row">
      <label for="Origem" class="col-sm-2 col-form-label"><b>Origem</b></label>
      <div class="col-sm-10">
        <input
          name="Origem"
          v-validate
          data-vv-rules="required"
          type="text"
          class="form-control"
          id="Origem"
          placeholder="Origem"
          v-model="dados_detalhamento.origem"
        />
        <span class="erro" v-show="errors.has('Origem')">{{
          errors.first("Origem")
        }}</span>
      </div>
    </div>
    <br />

    <button class="btn btn-primary m-2" @click="edicao(id)" v-if="id">
      editar
    </button>
    <button class="btn btn-primary m-2" @click="cadastramento()" v-else>
      Cadastra
    </button> 
    <b-button
      variant="primary"
      @click="
        $router.push({
          name: 'list',
          path: '/:tipo',
          params: { tipo: tipo },
        })
      "
      >Voltar para {{ tipo }}</b-button
    >
  </b-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  created() {
    if (this.id) {
      this.detalhamento(this.id);
    }
    if (this.tipo == "carros") {
      this.listagem_marca();
    }
  },
  data() {
    return {
      Swal: Swal,
      tipo: this.$route.params.tipo,
      id: this.$route.params.id,
      dados_editar: {},
      dados_litagem_marca: {},
      dados_detalhamento: {
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
    edicao(id) {
      axios
        .put(
          "http://127.0.0.1:8000/" + this.tipo + "/" + id + "/",
          this.dados_detalhamento
        )
        .then(() => {
          this.$router.push({ name: "list", params: { tipo: this.tipo } });
          this.alert_salva();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cadastramento() {
      axios
        .post(
          "http://127.0.0.1:8000/" + this.tipo + "/",
          this.dados_detalhamento
        )
        .then(() => {
          this.alert_salva();
          this.dados_detalhamento = {
            nome: "",
            km_por_galao: null,
            cilindros: null,
            cavalor_de_forca: null,
            peso: null,
            aceleracao: null,
            ano: null,
            origem: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detalhamento(id) {
      axios
        .get("http://127.0.0.1:8000/" + this.tipo + "/" + id + "/")
        .then((res) => {
          this.dados_detalhamento = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listagem_marca() {
      axios
        .get((this.http = "http://127.0.0.1:8000/marcas/"))
        .then((res) => {
          this.dados_litagem_marca = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    alert_salva() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style>
.erro {
  color: red;
}
</style>
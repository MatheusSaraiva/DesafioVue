<template>
  <b-container>
    <br>
    <b-button variant="primary" @click="mudar_tabela()">
      <samp v-if="tipo == 'marcas'">Ir para tabela de Carros</samp>
      <samp v-else>Ir para tabela de Marcas</samp>
    </b-button>
    <br /><br />
    <b-input-group>
        <label class="col-sm-2 col-form-label"><b>Filtrar Origem {{ tipo }} </b></label>
      <b-form-input v-model="filter_origen" placeholder="Filtrar Origem"></b-form-input>
      <b-input-group-append >
        <b-button variant="primary" @click="ober_listagem()">Enviar</b-button>
      </b-input-group-append>
    </b-input-group>
    <br />
    <b-input-group>
      <label class="col-sm-2 col-form-label"><b>Pesquisar {{ tipo }} </b></label>
      <b-form-input v-model="search_nome" placeholder="Pesquisar Nome"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="ober_listagem()"
          >Pesquisar</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <br />
        <b-button
      variant="primary"
      @click="
        $router.push({
          name: 'cadastro',
          path: '/:tipo/cadastra/',
          params: { tipo: tipo },
        })
      "
      >Cadastro de {{ tipo }}</b-button
    >
<br />
<br />
    <b-table bordered striped hover :items="dados" :fields="fields">
      <template #cell(Detalhamento)="data">
        <b-button
          variant="secondary"
          @click="
            $router.push({
              name: 'detalher',
              path: '/:tipo/detalhamento/:id',
              params: { tipo: tipo, id: data.item.id },
            })
          "
          >Detalhamento</b-button
        >
      </template>

      <template #cell(Edicao)="data">
        <b-button
          variant="warning"
          @click="
            $router.push({
              name: 'editar',
              path: '/:tipo/editar/:id',
              params: { tipo: tipo, id: data.item.id },
            })
          "
          >Editar</b-button
        >
      </template>

      <template #cell(Remocao)="data">
        <b-button variant="danger" @click="alert_delete(data.item.id, data.item.nome)"
          >Remocao</b-button
        >
      </template>
    </b-table>


  </b-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  created() {
    this.ober_listagem();
  },
  data() {
    return {
      Swal: Swal,
      search_nome: "",
      filter_origen: "",
      fields: ["nome", "origem", "ano", "Detalhamento", "Edicao", "Remocao"],
      dados: [],
      tipo: this.$route.params.tipo,
    };
  },
  methods: {
    ober_listagem() {
      if (this.tipo == "marcas") {
        this.fields = ["nome", "origem", "Detalhamento", "Edicao", "Remocao"];
      } else {
        this.fields = [
          "nome",
          "origem",
          "ano",
          "Detalhamento",
          "Edicao",
          "Remocao",
        ];
      }

      axios
        .get(
          (this.http =
            "http://127.0.0.1:8000/" +
            this.tipo +
            "/?origem=" +
            this.filter_origen +
            "&search=" +
            this.search_nome)
        )
        .then((res) => {
          this.dados = res.data;
          this.search_nome = "";
          this.filter_origen = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    remocao(id) {
      axios
        .delete("http://127.0.0.1:8000/" + this.tipo + "/" + id + "/")
        .then(() => {
          console.log("Usuário deletado com sucesso");
          this.ober_listagem();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mudar_tabela() {
      if (this.tipo == "carros") {
        this.tipo = "marcas";
        this.ober_listagem();
        this.$router.push({
          name: "list",
          path: "/:tipo",
          params: { tipo: this.tipo },
        });
      } else {
        this.tipo = "carros";
        this.ober_listagem();
        this.$router.push({
          name: "list",
          path: "/:tipo",
          params: { tipo: this.tipo },
        });
      }
    },
    alert_delete(id, nome) {
      Swal.fire({
        title: "Você tem certeza que deseja remover "+nome+"?",
        showDenyButton: true,
        confirmButtonText: "Sim, quero remover!",
        denyButtonText: "Cancelar",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.remocao(id)
                Swal.fire({
        position: "center",
        icon: "success",
        title: "Removido com sucesso!",
        showConfirmButton: false,
        timer: 1000,
      })
        }
      });
    },
  },
};
</script>

<style>
</style>
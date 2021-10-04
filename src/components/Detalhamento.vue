<template>
  <b-container>
    
      <b-card border-variant="light" header="Detalhamento" class="text-center">
        <b-card-text>
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
          <br/><br/>
          <h2>Detalhamento de {{ tipo }}</h2>
         <b-list-group-item>
            Nome: 
            {{ dados_detalhamento.nome }}
          </b-list-group-item>
         <b-list-group-item>
            Origem: 
            {{ dados_detalhamento.origem }}
          </b-list-group-item>
          <samp v-if="tipo == 'carros'">
           <b-list-group-item>
              Ano: 
              {{ dados_detalhamento.ano }}
            </b-list-group-item>

           <b-list-group-item>
              Km por galao: 
              {{ dados_detalhamento.km_por_galao }}
            </b-list-group-item>

           <b-list-group-item>
              Cilindros: 
              {{ dados_detalhamento.cilindros }}
            </b-list-group-item>

           <b-list-group-item>
              Cavalor de forca: 
              {{ dados_detalhamento.cavalor_de_forca }}
            </b-list-group-item>

           <b-list-group-item>
              Peso: 
              {{ dados_detalhamento.peso }}
            </b-list-group-item>

           <b-list-group-item>
              Aceleracao: 
              {{ dados_detalhamento.aceleracao }}
            </b-list-group-item>

            <h2>Detalhamento da Marca</h2>
           <b-list-group-item>
              Nome: 
              {{ detalhamento_marca.nome }}
            </b-list-group-item>
           <b-list-group-item>
              Origem: 
              {{ detalhamento_marca.origem }}
            </b-list-group-item>
          </samp>
        </b-card-text>
      </b-card>
    
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.detalhamento(this.$route.params.id);
  },
  data() {
    return {
      detalhamento_marca: {},
      dados_detalhamento: [],
      tipo: this.$route.params.tipo,
    };
  },
  methods: {
    detalhamento(id) {
      axios
        .get("http://127.0.0.1:8000/" + this.tipo + "/" + id + "/")
        .then((res) => {
          this.dados_detalhamento = res.data;
          if (this.tipo == "carros") {
            this.detalhamento_carro_marca(this.dados_detalhamento.marca);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    detalhamento_carro_marca(id) {
      axios
        .get("http://127.0.0.1:8000/marcas/" + id)
        .then((res) => {
          this.detalhamento_marca = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
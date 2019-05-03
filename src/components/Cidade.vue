<template>
  <div id="home">
    <b-container fluid md="*">
      <b-card class="bg-light bold" header="Previsão Climática Para as Cidades Brasileiras">
        <b-card-body>
          <painel-header
            :favsCid="favs"
            :filtroCidade="filtroCidade"
            v-on:update:filtroCidade="filtroCidade = $event"
          ></painel-header>

          <b-card
            :header="`Tempo agora em ${cidade}`"
            class="text-left bold"
            v-if="cidade.length>0"
          >
            <b-container>
              <b-row>
                <b-col>
                  <span class="temperature">{{temperatura}}°</span>
                  <br>
                  <img class="icon_temp_gr" :src="icon">
                  <br>
                  {{descricao}}
                </b-col>
                <b-col>
                  <span style="padding: 10px">
                    Mín: {{minimo}}°
                    <br>
                  </span>
                  <span style="padding: 10px">
                    Máx: {{maximo}}°
                    <br>
                  </span>
                  <br>

                  <img class="icon_temp" src="../assets/images/humidity.png">
                  {{umidade}}
                  <img
                    class="icon_temp"
                    src="../assets/images/vento.png"
                  >
                  {{vento}}
                  <br>
                  <br>
                </b-col>
              </b-row>
            </b-container>
          </b-card>

          <painel-forecast
            v-if="cidade.length>0"
            :tabsTitle="tabsTitle"
            :dtHrList="datas"
            :tempsList="temps"
          />
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";

import PainelForecast from "./PainelForecast.vue";

import { routes } from "../routes";

//import VuePlaceAutocomplete from 'vue-place-autocomplete';

var favs = JSON.parse(localStorage.getItem("cidadesfavoritas")) || [];

export default {
  components: {
    "painel-forecast": PainelForecast,
    "painel-header": Header
  },

  data() {
    return {
      filtroCidade: "",
      selecao: null,
      temperatura: "",
      maximo: "",
      minimo: "",
      umidade: "",
      vento: "",
      descricao: "",
      cidade: "",
      icon: "",
      datas: [],
      temps: [],
      tabsTitle: [],
      cidadesFavoritas: [],
      routes,
      favs
    };
  },

  watch: {
    $route(to, from) {
      //this.selecao = null;
      //this.$forceUpdate()

      this.filtroCidade = this.$route.params.nomeCidade;

      //this.buscaTemperatura();
    },

    filtroCidade(newValue) {
      this.buscaTemperatura();
    }
  },

  mounted: function() {
    if (this.$route.params.nomeCidade != undefined) {
      this.filtroCidade = this.$route.params.nomeCidade;
    }
  },

  methods: {
    formatDate(dt) {
      let partes = dt.toString().split("-");

      let dia = partes[2].toString().substring(0, 2);
      let mes = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
      ][parseInt(partes[1])];
      let ano = partes[0];

      return dia + " de " + mes;
    },

    addCidadeFavorita() {
      
      let objCid = {
        buscas: 1,
        nome: this.cidade
      };

      if (this.favs.some(e => e.nome === this.cidade)) {
        let objIndex = this.favs.findIndex(obj => obj.nome === this.cidade);

        this.favs[objIndex].buscas++;
      } else {
        this.favs.push(objCid);
      }
      this.favs = this.favs.sort((a, b) => b.buscas - a.buscas);
      localStorage.setItem("cidadesfavoritas", JSON.stringify(this.favs));
    },

    buscaTemperatura() {
      //alert(this.filtroCidade);
      this.$http
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            this.filtroCidade +
            "&units=metric&lang=pt&APPID=b2844c581cccfd926861b792ece838fd"
        )
        .then(res => {
          this.temperatura = res.data.main.temp;
          this.minimo = res.data.main.temp_min;
          this.maximo = res.data.main.temp_max;
          this.umidade = res.data.main.humidity + "%";
          this.vento = res.data.wind.speed + "m/s";
          this.cidade = res.data.name + "-" + res.data.sys.country;
          this.descricao = res.data.weather[0].description;
          this.icon =
            "http://openweathermap.org/img/w/" +
            res.data.weather[0].icon +
            ".png";

          this.buscaPrevisoes();
        })
        .catch(error => {
          console.log(error);
        });
    },

    buscaPrevisoes() {
      this.addCidadeFavorita();

      this.$http
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            this.filtroCidade +
            "&units=metric&lang=pt&APPID=b2844c581cccfd926861b792ece838fd"
        )
        .then(res => {
          this.tabsTitle = [];
          let i = 0;
          this.datas = res.data.list.map(list => {
            let str = this.formatDate(list.dt_txt);
            if (!this.tabsTitle.includes(str)) {
              this.tabsTitle.push(str);
            }
            return list.dt_txt;
          });

          this.temps = res.data.list.map(list => {
            return list.main.temp;
          });
          this.tabsTitle[0] = "Hoje";
          this.tabsTitle[1] = "Amanhã";
          this.tabsTitle.lenght = 6;
          //console.log("here" + this.tabsTitle);

          //this.carregaGraficos();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style >
.bold {
  font-weight: bold;
}

.temperature {
  font-family: "Vast Shadow", cursive;
  font-size: 50px;
  vertical-align: top;
}

.icon_temp {
  border-radius: 8px;
  max-width: 35px;
}

.icon_temp_gr {
  padding: 0;
  max-width: 100px;
  max-height: 100px;
}

#temp-values {
  max-width: 600px;
  text-align: right;
  text-justify: distribute;
  display: block;
  position: relative;
  top: -30px;
  left: 69px;
}

#info {
  padding-left: 20px;
  position: relative;
  top: -20px;
}
</style>
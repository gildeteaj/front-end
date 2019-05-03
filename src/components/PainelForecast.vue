<template>
  <div>
    <b-card no-body header="Variação da Temperatura" class="bold">
      <b-tabs pills card>
        <b-tab v-for="(data, index) in tabsTitle" :key="`dyn-tab-${data}`" :title="`${data}`" >
          <div class="grafico">
            <line-chart
              :chartdata="chartData[index]"
              :options="chartOptions[index]"
              style="height: 300px"
            />
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  components: {
    "line-chart": LineChart
  },

  props: {
   

    dtHrList: {
      type: Array,
      default: []
    },

    tempsList: {
      type: Array,
      default: []
    },

    tabsTitle: {
      type: Array,
      default: []
    }
  },

  watch: {
    tempsList(newValue){
      
      this.carregaGraficos();
    }
  },

  data() {
    return {
      chartData: [],
      chartOptions: []
    };
  },

  beforeUpdate() {
    //this.preencheTabs();
    this.carregaGraficos();
  },

  
  methods: {
    

    formataOptions() {
      return {
        maintainAspectRatio: false,

        title: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }

              label += Math.floor(tooltipItem.yLabel);
              return label + "°C";
            }
          }
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Hora"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              labelString: "Temperatura(°C)",
              gridLines: {
                color: "rgb(210,210,211)"
              },
              ticks: {
                callback: function(value, index, values) {
                  return value + "°C";
                }
              }
            }
          ]
        }
      };
    },

    preencheChartData(dts, temp) {
      return {
        labels: dts,
        datasets: [
          {
            label: "Temperatura Média",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            fill: true,
            data: temp
          }
        ]
      };
    },

    carregaGraficos() {
        //this.preencheTabs()
        let ind = 0;
       
        let limite = 40;
        for (let i = 0; i < 40; i += 8) {
         if (this.dtHrList[i] != undefined) {
          //pq não traz todos os horários do primeiro dia
          let id = this.dtHrList[i].substring(0, 10);

          let labels = [];
          let temperaturas = [];

          for (let j = 0; j < 8; j++) {
            
            if (this.dtHrList[i + j] !== undefined){

             //pq não traz todos os horários do primeiro dia
             if (id.valueOf() !== this.dtHrList[i + j].substring(0, 10).valueOf()) {
              i--;
              //console.log("mudou");
              //limite -= (8 - j);
              continue;
             }
            

            labels.push(this.dtHrList[i + j].substring(11, 16));
            temperaturas.push(this.tempsList[i + j]);
            }
          }

          this.chartData[ind] = this.preencheChartData(labels, temperaturas);
          this.chartOptions[ind] = this.formataOptions();
          //console.log(this.chartData[ind]);
    
          ind++;
        }        
      }
    }
  }
};
</script>

<style>
</style>

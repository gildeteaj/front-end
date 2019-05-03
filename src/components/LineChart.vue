<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    
    options: {
      type: Object,
      default: null
    },

    height: {
      type: Number,
      default: 200
    }
  },
  
  watch: {
    chartdata(newValue){
      //console.log("detectouhere"+newValue);
      this.renderChart(this.chartdata, this.options)
    }
  
  },

  mounted (){
      this.renderChart(this.chartdata, this.options)
  },
  
  
  computed: {
    myStyles () {
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  }
}
</script>
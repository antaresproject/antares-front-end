// line.js
import VueCharts from 'vue-chartjs';
import {Line, mixins} from 'vue-chartjs';

export default Line.extend({
    mixins: [mixins.reactiveProp],
    props: [
        'chartData',
        'options'
    ],
    mounted() {
        this.renderChart(this.chartData, this.options);// options end
    } 
});

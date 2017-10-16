// line.js
import VueCharts from 'vue-chartjs';
import { HorizontalBar, mixins } from 'vue-chartjs';

export default HorizontalBar.extend({
    mixins: [mixins.reactiveProp],
    props: [
        'chartData',
        'options'
    ],
    mounted() {
        this.renderChart(this.chartData, this.options);// options end
    }
});

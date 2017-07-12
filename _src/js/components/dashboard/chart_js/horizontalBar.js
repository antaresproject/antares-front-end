// line.js
import VueCharts from 'vue-chartjs';
import { HorizontalBar } from 'vue-chartjs';

export default HorizontalBar.extend({
  props: [
    'quantityLines',
    'quantityColumns',
    'background',
    'hoverBackground',
    'nTwoBackground',
    'nTwoHoverBackground',
  ],
  mounted() {
    let self = this;
    let infoTable;

    let quantityColumnsArray = [];
    let quantityRandom = [];
    let quantityRandom2 = [];
    for (let i = 0; i < self.quantityColumns; i++) {
      quantityColumnsArray.push('Data Stream ' + (i + 1));
      quantityRandom.push(Math.floor(Math.random() * 100 + 1));
      quantityRandom2.push(Math.floor(Math.random() * 100 + 1));
    }

    if (self.quantityLines === '1') {
      infoTable = {
        labels: quantityColumnsArray,
        datasets: [
          {
            backgroundColor: self.background,
            data: quantityRandom,
            hoverBackgroundColor: self.hoverBackground,
          },
        ],
      };
    } else if (self.quantityLines === '2') {
      infoTable = {
        labels: quantityColumnsArray,
        datasets: [
          {
            backgroundColor: self.background,
            data: quantityRandom,
            hoverBackgroundColor: self.hoverBackground,
          },
          {
            backgroundColor: self.nTwoBackground,
            data: quantityRandom,
            hoverBackgroundColor: self.nTwoHoverBackground,
          },
        ],
      };
    }
    self.renderChart(infoTable, {
      //options start
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        yAxes: [
          {
            display: false,
          },
        ],
        xAxes: [
          {
            display: false,
            barPercentage: 1,
          },
        ],
      },
    }); // options end
  },
});

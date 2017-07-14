// line.js
import VueCharts from 'vue-chartjs';
import { Line } from 'vue-chartjs';

export default Line.extend({
  props: [
    'quantityLines',
    'quantityColumns',
    'bottomBar',
    'background',
    'borderLineColor',
    'nTwoBackground',
    'nTwoBorderLineColor'
  ],
  mounted() {
    let self = this;
    // console.log(self.bottomBar)

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
        // labels: self.bottomBar,
        labels: quantityColumnsArray,
        datasets: [
          {
            backgroundColor: self.background,
            borderColor: self.borderLineColor,
            borderWidth: 1,
            data: quantityRandom,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }
        ]
      };
    } else if (self.quantityLines === '2') {
      infoTable = {
        labels: quantityColumnsArray,
        datasets: [
          {
            backgroundColor: self.background,
            borderColor: self.borderLineColor,
            borderWidth: 1,
            data: quantityRandom,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          },
          {
            backgroundColor: self.nTwoBackground,
            borderColor: self.nTwoBorderLineColor,
            borderWidth: 1,
            data: quantityRandom2,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent'
          }
        ]
      };
    }
    self.renderChart(
      infoTable,
      {
        //options start
        responsive: true,
        maintainAspectRatio: false,
        legend: false,
        scales: {
          yAxes: [
            {
              display: false,
              // display:false,    //#76 Artificial error
              ticks: {
                beginAtZero: false,
                callback: function(label) {
                  return label + ' $';
                }
              }
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        }
      } // options end
    );
  }
});

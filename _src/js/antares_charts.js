/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Global
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

const AntaresCharts = {

    init() {

        if (!$('.page-dashboard').length) {
            return false;
        }

        this.setSizes();
        this.sortData();
        // this.compare();
        this.RWD();



    },

    //methods
    data: {lineChart:[{value:890,date:'2012-07-12'},{value:1029,date:'2013-04-09'},{value:802,date:'2016-02-13'},{value:1397,date:'2012-11-19'},{value:1865,date:'2015-11-14'},{value:1513,date:'2014-08-06'},{value:892,date:'2013-06-29'},{value:1071,date:'2014-03-28'},{value:808,date:'2012-09-16'},{value:1832,date:'2013-04-11'},{value:1475,date:'2013-04-08'},{value:1515,date:'2014-07-18'},{value:256,date:'2013-08-08'},{value:1854,date:'2015-06-16'},{value:1322,date:'2015-11-14'},{value:1697,date:'2013-07-15'},{value:1444,date:'2015-06-15'},{value:537,date:'2014-11-06'},{value:651,date:'2013-10-04'},{value:1496,date:'2014-12-17'},{value:1056,date:'2014-08-18'},{value:1416,date:'2014-02-21'},{value:1871,date:'2014-04-04'},{value:1013,date:'2012-06-27'},{value:866,date:'2012-05-03'},{value:1319,date:'2015-04-07'},{value:1331,date:'2015-12-17'},{value:1677,date:'2015-02-17'},{value:465,date:'2014-02-23'},{value:1612,date:'2012-05-23'},{value:1337,date:'2012-09-23'},{value:1711,date:'2016-01-15'},{value:1545,date:'2013-05-05'},{value:1588,date:'2015-06-07'},{value:796,date:'2013-11-15'},{value:1655,date:'2013-05-17'},{value:605,date:'2015-02-21'},{value:748,date:'2014-11-27'},{value:321,date:'2015-11-24'},{value:1683,date:'2013-01-10'},{value:601,date:'2015-10-04'},{value:1676,date:'2012-11-25'},{value:1244,date:'2013-03-07'},{value:369,date:'2012-11-13'},{value:1295,date:'2014-12-28'},{value:826,date:'2014-03-10'},{value:785,date:'2014-04-07'},{value:1195,date:'2013-12-22'},{value:608,date:'2012-08-03'},{value:941,date:'2014-02-28'}],lineChart2:[{date:'2012-07-12',value:890},{date:'2013-04-09',value:1029},{date:'2016-02-13',value:802},{date:'2012-11-19',value:1397},{date:'2015-11-14',value:1865},{date:'2014-08-06',value:1513},{date:'2013-06-29',value:892},{date:'2014-03-28',value:1071},{date:'2012-09-16',value:808},{date:'2013-04-11',value:1832},{date:'2013-04-08',value:1475},{date:'2014-07-18',value:1515},{date:'2013-08-08',value:256},{date:'2015-06-16',value:1854},{date:'2015-11-14',value:1322},{date:'2013-07-15',value:1697},{date:'2015-06-15',value:1444},{date:'2014-11-06',value:537},{date:'2013-10-04',value:651},{date:'2014-12-17',value:1496},{date:'2014-08-18',value:1056},{date:'2014-02-21',value:1416},{date:'2014-04-04',value:1871},{date:'2012-06-27',value:1013},{date:'2012-05-03',value:866},{date:'2015-04-07',value:1319},{date:'2015-12-17',value:1331},{date:'2015-02-17',value:1677},{date:'2014-02-23',value:465},{date:'2012-05-23',value:1612},{date:'2012-09-23',value:1337},{date:'2016-01-15',value:1711},{date:'2013-05-05',value:1545},{date:'2015-06-07',value:1588},{date:'2013-11-15',value:796},{date:'2013-05-17',value:1655},{date:'2015-02-21',value:605},{date:'2014-11-27',value:748},{date:'2015-11-24',value:321},{date:'2013-01-10',value:1683},{date:'2015-10-04',value:601},{date:'2012-11-25',value:1676},{date:'2013-03-07',value:1244},{date:'2012-11-13',value:369},{date:'2014-12-28',value:1295},{date:'2014-03-10',value:826},{date:'2014-04-07',value:785},{date:'2013-12-22',value:1195},{date:'2012-08-03',value:608},{date:'2014-02-28',value:941}],lineChart3:[{value:1134,date:'2012-12-24'},{value:1649,date:'2013-02-21'},{value:567,date:'2012-04-25'},{value:734,date:'2014-12-01'},{value:604,date:'2012-05-19'},{value:1640,date:'2013-01-06'},{value:1792,date:'2013-09-10'},{value:236,date:'2015-06-20'},{value:1475,date:'2014-09-14'},{value:291,date:'2016-02-01'},{value:644,date:'2015-03-28'},{value:1979,date:'2015-11-15'},{value:692,date:'2015-02-05'},{value:1824,date:'2013-06-01'},{value:1007,date:'2015-04-07'},{value:1771,date:'2015-05-19'},{value:1960,date:'2012-12-19'},{value:594,date:'2014-09-13'},{value:268,date:'2015-06-19'},{value:1020,date:'2014-11-03'},{value:989,date:'2013-04-30'},{value:723,date:'2014-02-25'},{value:1882,date:'2014-03-23'},{value:992,date:'2013-12-31'},{value:1042,date:'2016-01-23'},{value:401,date:'2015-09-24'},{value:1442,date:'2014-12-05'},{value:1544,date:'2012-04-10'},{value:1337,date:'2012-05-21'},{value:639,date:'2013-01-19'},{value:736,date:'2012-03-06'},{value:801,date:'2014-12-02'},{value:1082,date:'2015-05-25'},{value:244,date:'2013-05-20'},{value:1298,date:'2014-03-16'},{value:941,date:'2013-10-08'},{value:1975,date:'2015-01-31'},{value:1986,date:'2013-05-23'},{value:287,date:'2012-05-03'},{value:1231,date:'2012-06-01'},{value:524,date:'2012-03-04'},{value:1698,date:'2012-01-28'},{value:999,date:'2014-09-29'},{value:1294,date:'2012-06-17'},{value:1500,date:'2015-02-26'},{value:762,date:'2012-05-30'},{value:1703,date:'2016-02-13'},{value:712,date:'2013-12-04'},{value:333,date:'2012-01-19'},{value:1358,date:'2013-02-19'},{value:1197,date:'2015-12-18'}],lineChart4:[{value:1018,date:'2014-10-14'},{value:1189,date:'2014-12-06'},{value:488,date:'2015-11-09'},{value:791,date:'2015-06-27'},{value:1215,date:'2014-01-28'},{value:1549,date:'2013-03-20'},{value:1130,date:'2014-03-15'},{value:1263,date:'2014-09-05'},{value:1402,date:'2014-09-06'},{value:1121,date:'2013-07-31'},{value:1068,date:'2016-01-04'},{value:518,date:'2015-02-21'},{value:1424,date:'2015-10-16'},{value:1564,date:'2013-10-04'},{value:985,date:'2016-02-10'},{value:1723,date:'2012-08-03'},{value:212,date:'2012-09-15'},{value:1659,date:'2012-07-06'},{value:909,date:'2015-09-18'},{value:1685,date:'2015-05-17'},{value:930,date:'2015-06-17'},{value:1224,date:'2013-11-12'},{value:1509,date:'2014-06-16'},{value:283,date:'2013-11-23'},{value:1683,date:'2012-05-28'},{value:974,date:'2015-07-29'},{value:1198,date:'2013-01-08'},{value:933,date:'2013-03-10'},{value:640,date:'2014-12-09'},{value:875,date:'2013-01-18'},{value:1187,date:'2013-10-13'},{value:1366,date:'2012-07-25'},{value:1265,date:'2012-05-28'},{value:1963,date:'2015-03-23'},{value:737,date:'2014-02-02'},{value:1267,date:'2014-03-03'},{value:848,date:'2012-12-15'},{value:1523,date:'2015-01-07'},{value:1351,date:'2012-08-02'},{value:498,date:'2012-03-16'},{value:412,date:'2012-04-12'},{value:1532,date:'2015-07-27'},{value:529,date:'2014-09-19'},{value:661,date:'2015-04-08'},{value:1165,date:'2012-11-22'},{value:1878,date:'2014-10-31'},{value:1059,date:'2015-08-03'},{value:686,date:'2014-03-22'},{value:1019,date:'2012-11-26'},{value:711,date:'2015-03-24'}],lineChart5:[{date:'2015-10-27',value:1284},{date:'2012-08-23',value:1982},{date:'2014-09-04',value:1940},{date:'2012-10-01',value:1947},{date:'2014-07-18',value:976},{date:'2013-12-02',value:1383},{date:'2016-02-09',value:1117},{date:'2013-08-30',value:1011},{date:'2012-09-03',value:1671},{date:'2013-10-17',value:1599},{date:'2014-10-26',value:954},{date:'2016-01-14',value:991},{date:'2012-08-17',value:869},{date:'2015-03-24',value:1678},{date:'2014-12-29',value:1230},{date:'2012-03-27',value:870},{date:'2012-12-19',value:796},{date:'2014-07-16',value:1562},{date:'2013-02-18',value:1757},{date:'2013-06-26',value:1309}],lineChart6:[{value:903,date:'2014-07-27'},{value:430,date:'2014-12-31'},{value:1753,date:'2013-08-19'},{value:1604,date:'2016-01-11'},{value:1565,date:'2015-10-07'},{value:712,date:'2015-01-03'},{value:1104,date:'2015-05-01'},{value:532,date:'2015-05-15'},{value:792,date:'2013-01-21'},{value:1851,date:'2014-02-25'},{value:1054,date:'2015-08-13'},{value:1625,date:'2014-06-29'},{value:1206,date:'2014-11-07'},{value:1258,date:'2014-06-16'},{value:974,date:'2015-08-09'},{value:223,date:'2012-05-05'},{value:1240,date:'2014-04-24'},{value:1527,date:'2012-12-17'},{value:474,date:'2014-07-25'},{value:286,date:'2015-07-16'},{value:868,date:'2015-04-09'},{value:597,date:'2015-01-08'},{value:1573,date:'2015-04-07'},{value:783,date:'2012-12-15'},{value:1447,date:'2012-07-06'},{value:1206,date:'2014-01-11'},{value:1549,date:'2013-01-20'},{value:1955,date:'2013-08-25'},{value:860,date:'2013-08-20'},{value:708,date:'2013-07-12'},{value:956,date:'2013-08-18'},{value:1527,date:'2013-01-17'},{value:923,date:'2012-09-26'},{value:1459,date:'2014-04-23'},{value:514,date:'2014-06-21'},{value:459,date:'2012-04-27'},{value:482,date:'2015-08-29'},{value:704,date:'2014-01-04'},{value:1357,date:'2015-03-08'},{value:1695,date:'2015-06-25'},{value:1072,date:'2015-02-13'},{value:898,date:'2015-11-23'},{value:1723,date:'2014-06-20'},{value:472,date:'2013-09-08'},{value:1511,date:'2012-11-13'},{value:1566,date:'2013-02-05'},{value:302,date:'2013-08-19'},{value:831,date:'2013-03-04'},{value:1837,date:'2015-08-12'}],lineChart7:[{date:"2014-07-27",value:903},{date:"2014-12-31",value:430},{date:"2013-08-19",value:1753},{date:"2016-01-11",value:1604},{date:"2015-10-07",value:1565},{date:"2015-01-03",value:712},{date:"2015-05-01",value:1104},{date:"2015-05-15",value:532},{date:"2013-01-21",value:792},{date:"2014-02-25",value:1851},{date:"2015-08-13",value:1054},{date:"2014-06-29",value:1625},{date:"2014-11-07",value:1206},{date:"2014-06-16",value:1258},{date:"2015-08-09",value:974},{date:"2012-05-05",value:223},{date:"2014-04-24",value:1240},{date:"2012-12-17",value:1527},{date:"2014-07-25",value:474},{date:"2015-07-16",value:286},{date:"2015-04-09",value:868},{date:"2015-01-08",value:597},{date:"2015-04-07",value:1573},{date:"2012-12-15",value:783},{date:"2012-07-06",value:1447},{date:"2014-01-11",value:1206},{date:"2013-01-20",value:1549},{date:"2013-08-25",value:1955},{date:"2013-08-20",value:860},{date:"2013-07-12",value:708},{date:"2013-08-18",value:956},{date:"2013-01-17",value:1527},{date:"2012-09-26",value:923},{date:"2014-04-23",value:1459},{date:"2014-06-21",value:514},{date:"2012-04-27",value:459},{date:"2015-08-29",value:482},{date:"2014-01-04",value:704},{date:"2015-03-08",value:1357},{date:"2015-06-25",value:1695},{date:"2015-02-13",value:1072},{date:"2015-11-23",value:898},{date:"2014-06-20",value:1723},{date:"2013-09-08",value:472},{date:"2012-11-13",value:1511},{date:"2013-02-05",value:1566},{date:"2013-08-19",value:302},{date:"2013-03-04",value:831},{date:"2015-08-12",value:1837}],barChart1:[{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.0278},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02022},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06973},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00747},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02517},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00098},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06333},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.01037},{"letter":"W","frequency":0.02465},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01971},{"letter":"Z","frequency":0.00074}],},
    sortData() {

        var data = this.data;

        //Sort Data
        function custom_sort(a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }

        data.lineChart.sort(custom_sort);
        data.lineChart2.sort(custom_sort);
        data.lineChart3.sort(custom_sort);
        data.lineChart4.sort(custom_sort);
        data.lineChart5.sort(custom_sort);
        data.lineChart6.sort(custom_sort);
        data.lineChart7.sort(custom_sort);
    },
    painter() {

        var self = this;

        var dataArray = [
            self.data.lineChart,
            self.data.lineChart2,
            self.data.lineChart3,
            self.data.lineChart4,
            self.data.lineChart5,
            self.data.lineChart6,
            self.data.lineChart7
        ];



        var random1 = dataArray[Math.floor(Math.random() * dataArray.length)];
        var random2 = dataArray[Math.floor(Math.random() * dataArray.length)];
        var random3 = dataArray[Math.floor(Math.random() * dataArray.length)];

        // console.log(random1);
        // console.log(random2);
        // console.log(random3);
        //line charts

        setTimeout(function() {


            if ($('#chart--one').length) {
                self.lineChart('chart--one', random1, 'linear', 'oh, very clean!');
            }

            if ($('#chart--two').length) {
                self.lineChart('chart--two', random2, 'basis', 'clean');
            }

            if ($('#chart--three').length) {
                self.lineChart('chart--three', random3, 'basis', 'clean');
            }

            if ($('#chart--four').length) {
                //bar chart
                self.barChart('chart--four');
            }

        }, 200);




        //client value
        if ($('#chart--client-value').length) {
            // AntaresCharts.lineChart('chart--client-value', AntaresCharts.data.lineChart5, 'basis');
        }
    },

    compare() {
        var self = this;
        $('.card--chart [data-icheck]').on('ifChecked', function(event) {
            self.painter();
        });
    },

    RWD() {

        var self = this;

        function job() {

            // $('.chart svg').remove();
            // $('.chart svg').css('transition', '700ms all ease-in-out');

            $('.chart').css('opacity', '0.2');
            self.setSizes();
            self.painter();
            $('.chart').css('opacity', '1');
            // console.log('doszlo do RWD');
            // $('.chart').animate('zoomInUp');
            // $('.chart').addClass('animated lightSpeedIn');


            // setTimeout(function() {

            //      $('.chart svg').css('opacity', '1');

            // }, 1200);
        }

        //execute

        // on windows resize
        $(window).on('resizeEnd', function() {

            // job();

        });

        //on document ready
        job();

        $('.grid-stack').one('change', function() {
            job();
        });

        // d3.select(window).on('resize', job());

    },

    setSizes() {



        $('.card--chart').each(function(index, el) {

            var cLeft = $(this).find('.card__left');
            var cHeader = cLeft.find('.card__header');

            var svg = cLeft.find('svg');

            svg.css('height', cLeft.outerHeight(true) - cHeader.outerHeight(true));

            // var h = $(this).height();
            // var w = $(this).width();
            // var headerH = $(this).find('.card__header').height();
            // var cardRW = $(this).find('.card__right').outerWidth();
            // $(this).find('.card__left').css('height', h);
            // $(this).find('.chart').css('height', h - headerH);
            // $(this).find('.chart svg').attr('height', h - headerH);
            // $(this).find('.chart svg').attr('width', w - cardRW);
            // $(this).find('.chart svg .lineChart--yAxis').css('width', w - cardRW);

        });

        // console.log('sizes have been set!');


    },

    lineChart(elementId, data, lineEasing, clean) {

        var self = this;
        var $target = $('#' + elementId);

        // return date to string form
        for (var i = 0; i < data.length; i++) {
            data[i].date = moment(data[i].date).format('YYYY-MM-DD');
        }

        var svgCleanup = function(elementId) {
            $target.find('svg *').remove();
            // console.log('removed lineChart');
        };

        if (clean && $target.find('path').length > 1) {
            svgCleanup();
        }

        var DURATION = 0;
        var DELAY = 0;

        // parse helper functions on top
        var parse = d3.time.format('%Y-%m-%d').parse;

        // console.log('PRZED ZMIANA');
        // console.log(data[0].date);

        // data manipulation first
        data = data.map(function(datum) {
            datum.date = parse(datum.date);
            return datum;
        });

        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        var containerEl = document.getElementById(elementId),
            properWidth = containerEl.clientWidth,
            width = $(containerEl).width(),
            height = $(containerEl).height() + 10,
            container = d3.select(containerEl),
            labelWidth = width - 18,

            svg = container.select('svg')
            .data(data)
            .attr('width', width)
            .attr('height', height);
        // .call(zoom)
        // .call(tip),
            var x = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]),

            dolarBaby = function(d) {
                return d + ' $';
            },

            yAxis = d3.svg.axis()
            .scale(y)
            .ticks(8)
            .tickSize(width)
            // .tickFormat(dolarBaby)
            .orient('right'),

            area = d3.svg.area().interpolate(lineEasing)

            .x(function(d) {
                return x(d.date);
            })

            .y0(height).y1(function(d) {
                return y(d.value);
            }),

            line = d3.svg.line().interpolate(lineEasing).x(function(d) {
                return x(d.date) + 0;
            })

            .y(function(d) {
                return y(d.value);
            }),

            startData = data.map(function(datum) {
                return {
                    date: datum.date,
                    value: 0
                };
            });

        function zoomed() {
            $('#' + elementId + ' .lineChart--area, ' + '#' + elementId + ' .lineChart--areaLine').attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        //domain
        x.domain([data[0].date, data[data.length - 1].date]);
        y.domain([0, d3.max(data, function(d) {
            return d.value;
        }) + 500]);

        //svg draw
        svg.append('g').attr('class', 'lineChart--yAxis').call(yAxis);
        //line
        svg.append('path').datum(startData).attr('class', 'lineChart--areaLine')
            .attr('d', line)
            .transition()
            .duration(DURATION)
            .delay(DURATION / 2)
            .attrTween('d', tween(data, line));

        //path
        svg.append('path').datum(startData).attr('class', 'lineChart--area').attr('d', area).transition().duration(DURATION).attrTween('d', tween(data, area));

        svg.append('path').datum(startData).attr('class', 'lineChart--tooltip')
            .attr('d', line)
            .transition()
            .duration(DURATION)
            .delay(DURATION / 2)
            .attrTween('d', tween(data, line));

        if (labelWidth > 0) {
            svg.selectAll('.lineChart--yAxis text')
                .attr('transform', 'translate(-' + labelWidth + ',0)');
        }

        //activate tip
        // d3.selectAll('.lineChart--tooltip')
        //     .on('mouseover', tip.show)
        //     .on('mouseout', tip.hide);

        svg.selectAll('.lineChart--yAxis .tick').append('rect')
            .attr("width", '44px')
            .attr("height", '20px');

        //proper order = kinda zindex
        $('svg .lineChart--yAxis .tick').each(function(index, el) {
            $(this).find('rect').appendTo($(this));
            $(this).find('text').appendTo($(this));
        });


        //animation
        function tween(b, callback) {
            return function(a) {
                var i = d3.interpolateArray(a, b);

                return function(t) {
                    return callback(i(t));
                };
            };
        }

    },

    barChart(elementId) {

        var self = this;

        if (!$('.page-dashboard').length) {
            return false;
        }

        var $barTarget = $('#' + elementId);

        var svgCleanup = function(elementId) {
            $barTarget.find('svg *').remove();
            // console.log('removed bar chart');
        };

        svgCleanup(elementId);

        var data = self.data.barChart1;
        var $target = $('#' + elementId);
        var pW = $target.outerWidth();
        var pH = $target.outerHeight();
        var margin = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            width = pW,
            height = pH,
            labelWidthBar = width - 18;

        var formatPercent = function(d) {
            return d + ' %';
        };
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], '.1');
        var y = d3.scale.linear()
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(6)
            .tickSize(width)
            .orient("right")
            .tickFormat(formatPercent);
        // var tip = d3.tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 10])
        //     // .offset([-10, 10])
        //     .direction('e')
        //     .html(function(d) {
        //         return "<div class='d3-tip__inner'><strong>Sample Value:</strong> <span style='color:#02A8F3'>" + d.frequency + "</span></div>";
        //     });
        var svg = d3.select('#' + elementId).select("svg")
            // d3.tsv("https://s3-us-west-2.amazonaws.com/s.cdpn.io/158719/barData.tsv", type, function(error, data) {
            .data(data)
            .attr("width", pW)
            .attr("height", pH);
        // svg.call(tip);
        x.domain(data.map(function(d) {
            return d.letter;
        }));
        y.domain([0, d3.max(data, function(d) {
            return d.frequency;
        })]);

        //fuck X axis
        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .text("Frequency");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.letter);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.frequency);
            })
            .attr("height", function(d) {
                return height - y(d.frequency);
            });
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide);

        //add rect behind label
        svg.selectAll('.tick').append('rect')
            .attr("width", '48px')
            .attr("height", '20px');
        $('svg .axis.y .tick').each(function(index, el) {
            $(this).find('rect').css('fill', '#fff').appendTo($(this));
            $(this).closest('rect').attr('width', $(this).width());
            $(this).find('text').appendTo($(this));
        });

        if (labelWidthBar > 0) {

            svg.selectAll('.axis.y text')
                .attr('transform', 'translate(-' + labelWidthBar + ',0)');

        }

        function type(d) {
            d.frequency = +d.frequency;
            return d;
        }

    }

};

$(function() {

    window.AntaresCharts = AntaresCharts;
    AntaresCharts.init();

});
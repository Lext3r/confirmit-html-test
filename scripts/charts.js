$(document).ready(function() {
	$(function () { 
	  sortByKey(data, 'total');
	  Highcharts.chart('chart1', {
	    chart: {
            type: 'column',
            events: {
            load: function(event) {     
                // modify the legend symbol from a rect to a line
                $('.highcharts-legend-item rect').attr('height', '4').attr('y', '10');
            }
        }  
        },
        title: {
            text: 'Top Themes',
            style:{
            	fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: getValuesByKey(data, 'category', 5),
            tickLength: 0
        },
        yAxis: {
        	labels:{
        		enabled: false
        	},
        	title:'',
            min: 0,
            lineWidth: 1,
            gridLineWidth: 0,
        },
        legend: {
            align: 'center',
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            shadow: false,
            symbolRadius: 0,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    allowOverlap:'true',
                    style: {
	                    fontWeight: 'normal',
	                    textShadow: 'none'
	                },
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black'
                }
            }
        },
        series: [{
            name: 'Negative',
            data: getValuesByKey(data, 'negative', 5),
            color:'#ff5722'
        }, {
            name: 'Neutral',
            data: getValuesByKey(data, 'neutral', 5),
            color: '#ffeb3b'
        }, {
            name: 'Positive',
            data: getValuesByKey(data, 'positive', 5),
            color: '#8bc34a'
        }]
    });
	});
	sortByKey(data, 'total').reverse();
	Highcharts.chart('chart2', {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: getValuesByKey(data, 'category')
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Positive',
            data: getValuesByKey(data, 'positive'),
            color:'#ff5722'
        }, {
            name: 'Neutral',
            data: getValuesByKey(data, 'negative'),
            color: '#ffeb3b'
        }, {
            name: 'Negative',
            data: getValuesByKey(data, 'neutral'),
            color: '#8bc34a'
        }]
    });

	sortByKey(data, 'positive');
    Highcharts.chart('chart3', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Top Positive Mentions',
            style:{
            	fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: getValuesByKey(data, 'category', 5),
            tickLength: 0
        },
        yAxis: {
        	labels:{
        		enabled: false
        	},
        	stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'normal',
                    color: 'black'
                }
            },
        	title:'',
            min: 0,
            lineWidth: 1,
            gridLineWidth: 0,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,  
                }
            }
        },
        legend:{
        	symbolRadius: 0
        },
        series: [{
            name: 'Positive',
            data: getValuesByKey(data, 'positive', 5),
            color:'#8bc34a'
        }]
    });

    sortByKey(data, 'negative');
    Highcharts.chart('chart4', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Top Negative Mentions',
            style:{
            	fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: getValuesByKey(data, 'category', 5),
            tickLength: 0
        },
        yAxis: {
        	labels:{
        		enabled: false
        	},
        	stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'normal',
                    color: 'black'
                }
            },
        	title:'',
            min: 0,
            lineWidth: 1,
            gridLineWidth: 0,
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,  
                }
            }
        },
        legend:{
        	symbolRadius: 0
        },
        series: [{
            name: 'Negative',
            data: getValuesByKey(data, 'negative', 5),
            color:'#ff5722'
        }]
    });

}); 